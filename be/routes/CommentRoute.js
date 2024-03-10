const express = require('express');
const CommentController = require('../controllers/CommentController');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/create',MiddlewareController.verifyTokenAndAdminAuth,CommentController.createComment)

module.exports = router;