const express = require('express');
const ProductController = require('../controllers/ProductController');
const MiddlewareController = require('../controllers/MiddlewareController');
const router = express.Router();

router.get('/',ProductController.getAllProduct)
router.get('/:id',ProductController.getOneProduct)
//admin
router.post('/create/:userId',MiddlewareController.verifyTokenAndAdminAuth,ProductController.createProduct)
router.delete('/delete/:productId/:userId',MiddlewareController.verifyTokenAndAdminAuth,ProductController.deleteProduct)
module.exports = router;