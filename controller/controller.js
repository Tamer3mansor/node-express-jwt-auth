const user = require('../Models/userModel');
//handel Errors
const handelerErrors = (err) =>{
    // console.log(err.message ,err.code);
    let error = {email:'',password:''};
    //handel error code
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

singup_get =(req,res)=>{
    res.render('signup');
}
singup_post = async (req,res)=>{
    const { email , password} = req.body;
    try {
     const User = await user.create({email , password}); // it a sync return promise
     res.status(201).json(User);
    } catch (err) {
    const errors =handelerErrors(err);
    res.status(400).json(errors);
    }
}
login_get =(req,res)=>{
    res.render('login');
}
login_post =(req,res)=>{
    res.send(req.params);
}

module.exports = {
    singup_get,singup_post , login_get , login_post ,
}