const express = require('express');
const {body} = require('express-validator');
const cartController = require('../controllers/cart');

const router = express.Router()

router.post('/addcart' , cartController.createCart);
router.get('/getcart',cartController.getCart);
router.post('/checkout',cartController.payment);
router.delete('/deletecart/:cartId',cartController.deleteCart);

module.exports = router;