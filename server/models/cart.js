const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userIp:{
        type : String
    },
    productId:{
        type:String,
    },
    productName:{
        type:String,

    },
    productPrice:{
        type:String,

    },
    productQuantity:{
        type:String,

    },
    productImageUrl1:{
        type:String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('cart',cartSchema);