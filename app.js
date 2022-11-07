const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Router/routes');
const cookiep=require('cookie-parser');
const {requireAuth , checkuser} = require('./middleware/middleware');
require('dotenv').config()

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookiep());
// app.use('/',authRoutes);
// // view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.url
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,()=>console.log("listen good") ))
  .catch((err) => console.log("this connection error" + err));

// routes
app.get('*' , checkuser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes);