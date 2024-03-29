const express = require("express");
const db = require("../orm/models/index");
const { QueryTypes } = require("sequelize");
const CommentController = {
  getProductComment: async (req, res) => {
    const { productId } = req.params;
    try {
      const comments = await db.Comment.findAll({
        where: { productId: productId },
        include: [
          {
            model: db.User,
            attributes: ["username"],
          },
        ],
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //using sequelize to create a comment
  createComment: async (req, res) => {
    try {
      const comment = await db.Comment.create({
        comment: req.body.comment,
        userId: req.params.userId,
        productId: req.body.productId,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //using raw queries to create comment
  // createComment: async (req, res) => {
  //   try {
  //     const { comment, productId } = req.body;
  //     const { userId } = req.params;
  
  //     // WARNING: Vulnerable to SQL injection
  //     const query = `
  //       INSERT INTO comments (comment, userId, productId)
  //       VALUES ('${comment}', '${userId}', '${productId}')
  //     `;
  
  //     await db.sequelize.query(query, { type: QueryTypes.INSERT });
  
  //     res.status(201).json({ message: "Comment created successfully" });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },
  editComment: async (req, res) => {
    const { id } = req.params.id;
    const { comment } = req.body;
    try {
      const comment = await db.Comment.update(
        {
          comment: comment,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    const { commentId } = req.params;
    try {
      await db.Comment.destroy({ where: { id: commentId } });
      res.status(200).json({ message: "Xóa đánh giá thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = CommentController;
