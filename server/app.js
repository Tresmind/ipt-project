const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Path = require('path');
const multer = require('multer');
const uuid = require('uuid');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');

const app = express();

const fileStorage = multer.diskStorage({
    destination: function(req , file , cb){
       cb(null , 'images')
    },
    filename: function(req , file , cb){
       cb(null , uuid() + '-' + file.originalname);
    }
 });
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null , true)
    }
    else {
        cb(null , false )
    }
};

app.use(bodyParser.json());


app.use(multer({storage:fileStorage , fileFilter : fileFilter}).array('imgCollection', 3));
app.use('/images' , express.static(Path.join(__dirname,'images')));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods' , 'GET,POST,DELETE,PUT,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

 app.use('/products',productRoutes);
 app.use('/users' , userRoutes);
 app.use('/cart',cartRoutes);
 app.use((error,req,res,next) => {
     console.log(error);
     const status = error.statusCode || 500;
     const message = error.message;
     const data = error.data;
     res.status(status).json({message:message , data:data});
 });
 
mongoose.connect('mongodb+srv://testuser:afham123@cluster0-2nmvg.mongodb.net/gaming?retryWrites=true&w=majority')
.then(result => {
    app.listen(3001);
   
})
.catch(err => {
    console.log(err);
})