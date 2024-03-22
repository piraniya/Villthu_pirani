const express = require('express');
const { getProducts, getSingleProduct,deleteProduct,updateProduct, createProduct } = require('../controller/productController');
const router = express.Router();
const upload = require ('../utils/multer')

// router.post('/product/new', createProduct);
router.post('/product/new',createProduct);
router.get('/products',getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').put(updateProduct);
module.exports = router;