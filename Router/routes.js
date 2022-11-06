const express = require('express');
const {login_get, singup_get ,login_post ,singup_post} = require('../controller/controller')
const Route = express.Router();
Route.get('/login',(login_get))
Route.get('/signup',(singup_get))
Route.post('/signup',(singup_post))
Route.post('/login',(login_post))
module.exports = Route;
//signup