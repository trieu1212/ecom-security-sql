import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async (refreshToken1) => {
  try {
    const res = await axios.post("http://localhost:7000/api/auth/refresh", {refreshToken:refreshToken1})
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createAxios = (user, dispatch, stateSuccess,refreshToken1) => {
  const newInstance = axios.create({});
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      // console.log(decodedToken)
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken(refreshToken1);
        console.log(data);
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return newInstance;
};
