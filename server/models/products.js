const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: String,
        
    },

    make : {
        type : String,
       
    },

    title: {
        type: String , 
        
    },

    description : {
        type : String,
       
    },

    price : {
        type: String,
        
    },

    imageUrl1 : {
        type: Array,
       
    },
    imageUrl2 : {
        type: String,
        
    },
    imageUrl3 : {
        type: String,
       
    },

    state : {
        type : String,
        
    },

    address : {
        type : String,
       
    },
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User',
    
    }
},
{timestamps : true}

);

module.exports = mongoose.model('products',productSchema);