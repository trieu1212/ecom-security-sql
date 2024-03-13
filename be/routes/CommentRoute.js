const express = require('express');
const CommentController = require('../controllers/CommentController');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.post('/create/:id',MiddlewareController.verifyTokenAndAuthorize,CommentController.createComment)
router.get('/',CommentController.getAllComment)
router.put('/edit/:id',MiddlewareController.verifyTokenAndAuthorize,CommentController.editComment)
router.delete('/delete/:id',MiddlewareController.verifyTokenAndAuthorize,CommentController.deleteComment)


module.exports = router;