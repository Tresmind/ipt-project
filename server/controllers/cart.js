const Cart = require('../models/cart');
const localIpUrl = require('local-ip-url');
const stripe = require("stripe")("sk_test_8jydm6Bwq0CerF3Ig5OJQVfr00JuculCCm");

exports.createCart = (req,res,next)=> {
    const userIp = localIpUrl();
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productQuantity = req.body.productQuantity;
    const productImageUrl1 = req.body.productImageUrl1;
    
    const cart = new Cart({
        userIp : userIp,
        productId : productId,
        productName : productName,
        productPrice : productPrice,
        productQuantity : productQuantity,
        productImageUrl1: productImageUrl1
        
    })
    cart.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'cart created successfully',
            cart : cart,
            
         });
    })
    .catch(err => {
        console.log(err);
     })
}

exports.getCart = (req,res,next) =>{
    Cart.find()
    .then(result => {
        res.status(200).json({message:'successfully fetched' , cart:result})
    })
    .catch(err=>{
        console.log(err);
     }) 
}

exports.payment = async (req,res,next) => {
    
    const token = req.body.token.id;
    const amount = req.body.amount;
    try{
        let data = await stripe.charges.create({
            amount : amount *100,
            currency:"pkr",
            description:"An example transaction",
            source : token
        });
        res.status(201).json({data});
        console.log(data);
    }
    catch(err){
        console.log(err);
        res.status(500).end();
    }
}

exports.deleteCart = (req,res,next) => {
    const cartId = req.params.cartId;
     console.log('check', cartId);
    Cart.findByIdAndRemove(cartId)
    .then(result => {
        console.log(result);
        res.status(200).json({message:'cart deleted!'})
    })
    .catch(err=>{
        console.log(err);
     }) 
}