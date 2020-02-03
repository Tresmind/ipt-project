const User = require('../models/users');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signUp = (req,res,next) => {
    const errors = validationResult(res);
    if(!errors.isEmpty()){
        const error = new Error('SignUp failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error; 
        
    }

    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;
    bcrypt.hash(password , 12)
    .then(hashedPw => {
        const users = new User({
            email:email,
            password:hashedPw,
            name:name,
            phone:phone,
            address:address,
            
        });
        return users.save()
     })
    .then(result => {
        res.status(201).json({message:'user created' , users: result });
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.signIn = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser ;
    User.findOne({email:email})
    .then(user => {
        if(!user){
            const error = new Error('User does not exist!');
            error.statusCode=401;
            throw error;
        }
       loadedUser = user;
       return bcrypt.compare(password , user.password);
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Password is incorrect!');
            error.statusCode=401;
            throw error;
        }
       const token = jwt.sign({
           email: loadedUser.email,
           userId:loadedUser._id.toString()
       },
       'somesupersecretkey', {expiresIn:'1h'}
       );
       res.status(200).json({token:token , userId:loadedUser._id.toString() , userName:loadedUser.name , userPhone:loadedUser.phone});
    })
        .catch(err => {
       if(!err.statusCode){
           err.statusCode=500;
       }
    })
}

exports.getUser = (req,res,next) => {
    const userId = req.params.userId;
    console.log('check',userId);
    User.findById(userId)
    .then(user => {
        if(!user) {
            const error = new Error('No user found!!');
            error.statusCode=402;
            throw error;
        }
        res.status(200).json({message:'user found' , user:user});
    })
    .catch(err => {
        console.log(err);
    })
}