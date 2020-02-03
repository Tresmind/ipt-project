const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated');
        error.statusCode=401;
        throw error;
    }
    const bearer = authHeader.split(' ');
    const token = bearer[1];
   
    let decodedToken;
    try{
        decodedToken = jwt.verify(token ,'somesupersecretkey');

    }
    catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
    }
    
    req.userId = decodedToken.userId;
    console.log('check',req.userId)
    next();


// console.log(req.header('Authorization').split(' ')[1]);
// next()
}
