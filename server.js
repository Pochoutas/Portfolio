const express = require('express');
const mongoose = require('mongoose');
const multer = require ('multer');
const session = require ('express-session');
const projectRouter = require('./routes/projectRouter.js');
const loginRouter = require('./routes/loginRouter.js');
require('dotenv').config()
const db = process.env.BDD_URL
const app = express()

app.use(session({secret: "azerty",saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(projectRouter)
app.use(loginRouter)

app.listen(3000,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecter a la bdd");
    }
})

app.all('*', (req,res)=>{
    res.redirect('/')
})


