const express = require('express');
const {body} = require('express-validator');
const productController = require('../controllers/products')
const isAuth = require('../middleware/isAuth');

const router = express.Router();



router.get('/products',productController.getProducts);

router.post('/products' ,isAuth, productController.createProducts);

router.get('/product/:productId', productController.getProduct);

module.exports = router ;
