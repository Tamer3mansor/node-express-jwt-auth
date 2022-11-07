const jwt=require('jsonwebtoken')
const User = require('../Models/userModel')
const requireAuth = (req,res,next)=>{

const token =req.cookies.jwt;
if(token)
{
jwt.verify(token,'tamer secret',(err,decetedtoken)=>{
    if(err)
    {
        res.redirect('/login')
    } else{
        console.log(decetedtoken);
        next();
    }

})
}
else
{
    // location.assign('/login');/
    res.redirect('/login')
}
}
const checkuser=(req,res,next)=>{
    const token =req.cookies.jwt;
if(token)
{
jwt.verify(token,'tamer secret',async(err,decodedToken)=>{
    if(err)
    {
        res.locals.user = null; 
      next();
    } else{
        let user= await User.findById(decodedToken.id);
        res.locals.user = user; 
        next();
    }

})
} else
{
    res.locals.user=null;
    next();
}
}
module.exports = {requireAuth ,checkuser };