
const bcrypt = require('bcryptjs');
const db = require('../orm/models/index');
const jwt = require('jsonwebtoken');
let refreshTokens = [];
const AuthController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2m" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  registerUser: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const newUser = await db.User.create({
        username: username,
        email: email,
        password: hashPassword,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.User.findOne({
        where: { username: username },
      });
      if (!user) {
        res.status(400).json({ message: "user not found" });
      } else {
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
          res.status(400).json({ message: "wrong password" });
        } else {
          const accessToken = AuthController.generateAccessToken(user);
          const refreshToken = AuthController.generateRefreshToken(user);
          refreshTokens.push(refreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
          });
          const { password, ...info } = user.dataValues;
          res.status(200).json({...info, accessToken });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  refresh: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ message: "User not authenticated" });
    } else {
      if (!refreshTokens.includes(refreshToken)) {
        res.status(403).json({ message: "Refresh token not valid" });
      } else {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
          if (err) {
            console.log(err);
          } else {
            refreshTokens = refreshTokens.filter(
              (token) => token !== refreshToken
            );
            const newAccessToken = AuthController.generateAccessToken(user);
            const newRefreshToken = AuthController.generateRefreshToken(user);
            res.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              path: "/",
              sameSite: "strict",
            });
            refreshTokens.push(newRefreshToken);
            res.status(200).json({ accessToken: newAccessToken });
          }
        });
      }
    }
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json({ message: "User logged out" });
  },
};

module.exports = AuthController;