
const Products = require('../models/Products');
const User = require('../models/users');
const jwt = require('jsonwebtoken');



exports.getProducts = (req,res,next) => {
   const currentPage = req.query.page || 1;
   const perPage = 8;
   let totalItems ;
   Products.find()
   .countDocuments()
   .then(count => {
      totalItems = count;
      return Products.find()
      .skip((currentPage -1) * perPage)
      .limit(perPage);
   })
   .then(products => {
   
      res.status(200).json({message:'fetched post successfully',products:products , totalItems : totalItems});
    
     
   })
   .catch(err=>{
      console.log(err);
   })
  
}

exports.createProducts = (req,res,next) => {
   if(!req.files){
      const error = new Error('No image provided');
      error.statusCode = 422;
      throw error;
   }
   const category = req.body.category;
   const make = req.body.make;
   const title = req.body.title;
   const desc = req.body.desc;
   const price = req.body.price;
   const state = req.body.state1;
   const address = req.body.address;
   // const imageUrl1 = req.file.path;
   const reqFiles = [];
   for(var i =0; i<req.files.length; i++){
     if(i >3){
        error = new Error('You can only select 3 pictures!!');
     }
     else {

     
     reqFiles.push(req.files[i].filename)
     }
   }
   let creator;
   const products = new Products ({
      category : category,
      make : make,
      title: title,
      description : desc,
      price : price,
      state : state,
      address : address,
      imageUrl1 : reqFiles,
      creator: req.userId
   });
   products.save()
   .then(result => {
      return User.findById(req.userId);
   })
   .then(user => {
      creator = user;
      user.products.push(products);
      return user.save();
   })
   .then(result => {
      console.log(result);
      res.status(201).json({
         message:'post created successfully',
         products : products,
         creator:{_id:creator._id , name : creator.name}
      });
   })
   .catch(err => {
      console.log(err);
   })
}

exports.getProduct=(req,res,next) => { 
   const productId = req.params.productId;
   Products.findById(productId)
   .then(product => {
      if(!product){
         const error = new Error('No product Found!');
         throw error;
      }
      res.status(200).json({message:'product fetched!!' , product:product});
   })
   .catch(err => {
      console.log(err);
      
   })
}