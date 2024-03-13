const express = require('express');
const db = require('../orm/models/index');

const CommentController = {
    getAllComment: async (req, res) => {
        try {
            const comment = await db.Comment.findAll()
            res.status(200).json(comment)
        } catch (error) {
            res.status(500).json({message: error.message})  
        }
    },
    createComment: async(req,res) =>{
        try {
            const comment = await db.Comment.create({
                comment: req.body.comment,
                userId: req.user.id,
                productId: req.body.productId
            })
            res.status(201).json(comment)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    editComment: async(req,res)=>{
        const {id} = req.params.id
        const {comment} = req.body
        try {
            const comment = await db.Comment.update(
                {where: id = id},
                {comment:comment}
            )
            res.status(200).json({comment})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    },
    deleteComment: async(req,res)=>{
        const {id} = req.params.id
        try {
            await db.Comment.destroy(
                {where: id = id}
            )
            res.status(200).json({message: "Xóa đánh giá thành công"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}
module.exports = CommentController;
