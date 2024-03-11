const express = require('express');
const db = require('../orm/models/index');

const CommentController = {
    createComment: async (req, res) => {
        
    },
    getAllComment: async (req, res) => {
        try {
            const comment = await db.Comment.findAll()
            res.status(200).json(comment)
        } catch (error) {
            res.status(500).json({message: error.message})  
        }
    }
}
module.exports = CommentController;
