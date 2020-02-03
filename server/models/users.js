const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
        // validate: {
        //     isAsync: true,
        //     validator: function(value, isValid) {
        //         const self = this;
        //         return self.constructor.findOne({ email: value })
        //         .exec(function(err, user){
        //             if(err){
        //                 throw err;
        //             }
        //             else if(user) {
        //                 if(self.id === user.id) {  // if finding and saving then it's valid even for existing email
        //                     return isValid(true);
        //                 }
        //                 return isValid(false);  
        //             }
        //             else{
        //                 return isValid(true);
        //             }

        //         })
        //     },
        //     message:  'The email address is already taken!'
        
        // }
    },
    password:{
        type:String,
        required:true
        
    },
    name:{
        type:String,
        required:true
      
    },
    phone:{
        type:Number,
        required:true
       
    },
    address:{
        type:String,
        required:true
       
    },
    products : [{
        type:Schema.Types.ObjectId,
        ref:'products'
    }]
})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User' , userSchema);