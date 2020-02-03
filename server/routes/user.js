const express = require('express');
const {body} = require('express-validator');

const User = require('../models/users');
const userController = require('../controllers/users');

const router = express.Router();

 router.post('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter valid email address')
    .custom((value,{req})=> {
        return User.findOne({email:value}).then(userDoc => {
            if(userDoc){
                return Promise.reject('Email already exist!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
     .trim()
     .isLength({min:5}),
    body('name')
    .trim()
    .not()
    .isEmpty(),
    body('phone')
    .isLength({min:10 , max:10}),
    body('address')

] , 

   userController.signUp);

router.post('/signin' , userController.signIn);
router.get('/getuser/:userId', userController.getUser);
   module.exports = router ;