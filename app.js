const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Router/routes');
const cookiep=require('cookie-parser');
require('dotenv').config()

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookiep());
app.use('/',authRoutes);
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.url
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,()=>console.log("listen good") ))
  .catch((err) => console.log("this connection error" + err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.get('/set-cookies',(req,res)=>{
// res.setHeader('('set-cookie','newUser=true');
res.cookie("newUser",false,{maxAge: 1000*60*60*24 , httpOnly:true });

res.send('got it');
});

app.get('/read-cookies',(req,res)=>{
  const cook=req.cookies;
  console.log(cook.newUser);
  res.json(cook);
})