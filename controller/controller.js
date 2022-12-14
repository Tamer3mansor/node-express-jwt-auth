const user = require('../Models/userModel');
const jwt = require('jsonwebtoken');
//handel Errors
const handelerErrors = (err) =>{
    // console.log(err.message ,err.code);
    let error = {email:'',password:''};
    //handel error code
    if(err.message='incorrect email')
    {
      error.email='this email is not registed';
    }
    if(err.message='incorrect password')
    {
      error.password='this password is incorrect';
    }
if (err.code==11000)
{
    error.email='email already registerd'
    return error;
}
    if(err.message.includes('user validation failed')){
     Object.values(err.errors).forEach(({properties}) => {
       error[properties.path] = properties.message;
     });
    // console.log(Object.values(err.errors));
    }
    return error;
}
const maxAge = 3*24*60*60;
 const creattoken = (id)=>{
    return jwt.sign({id} , 'tamer secret' ,
     {
        expiresIn:maxAge
    });
 }
singup_get =(req,res)=>{
    res.render('signup');
}
singup_post = async (req,res)=>{
    const { email , password} = req.body;
    try {
     const User = await user.create({email , password}); // it a sync return promise
     const token = creattoken(User._id);
     res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000  })
     res.status(201).json({user:User._id});
    } catch (err) {
    const errors =handelerErrors(err);
    res.status(400).json(errors);
    }
}
login_get =(req,res)=>{
    res.render('login');
}
login_post =async(req,res)=>{
  const {email ,password} = req.body;
  try {
    const User = await user.login(email,password);
    const token = creattoken(User._id);
    res.cookie('jwt',token,{httpOnly:true, maxAge:maxAge*1000  })
    res.status(200).json({user: User._id});
  } catch (error) {
    const errors =handelerErrors(error);
    res.status(400).json({errors});
  }
}
logout_get= (req,res) =>{
res.cookie('jwt','',{maxAge:1});
res.redirect('/');
}
module.exports = {
    singup_get,singup_post , login_get , login_post ,
}