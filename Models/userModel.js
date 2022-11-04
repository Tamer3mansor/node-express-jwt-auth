const mongoose = require('mongoose');
const { isEmail } =require('validator');
const bycript = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: [true , 'please enter an email'],
        unique: true,
        lowercase : true,
        validate : [isEmail, 'please enter a vaild email']
    },
    password : {
        type: String,
        require: [true , 'please enter a password'],
        minlength: [6, 'password must be more than 6 char'],

    }
});
// userSchema.post('save',function(next,doc){
//     console.log(doc);
// next();
// })
userSchema.pre('save',async function(next){
const salt=await bycript.genSalt();
this.password =await bycript.hash(this.password,salt)  //this refere to the person that log in 
    next(); 
}); 
const user = mongoose.model('user',userSchema);
module.exports =   user;
