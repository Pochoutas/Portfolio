const express = require("express");
const logintRouter = express.Router();
const UserModel = require('../model/user.js');
let crypto = require('../customDependecies/crypto');



logintRouter.get('/userlogin', async (req, res) => {
    try {
     
      req.session.destroy()
       res.render('loginform.twig')
    } catch (err) {
       console.log(err);
       res.send(err);
    }
 })

 logintRouter.get('/addUser', async (req, res) => {
    try {
       res.render('userform.twig')
    } catch (err) {
       console.log(err);
       res.send(err);
    }
 })

 logintRouter.post('/addUser', async (req, res) => {
    try {
       req.body.password = await crypto.cryptPassword(req.body.password)
       let user = new UserModel(req.body)
       user.save()
       res.redirect('/')
    } catch (err) {
       console.log(err);
       res.send(err);
    }
 })

 logintRouter.post('/userlogin', async (req, res) => {
    try {
       let user = await UserModel.findOne({ name: req.body.name })
       
       if (user) {
         
          if(await crypto.comparePassword(req.body.password, user.password)){
          req.session.userId = user._id
          res.redirect('/addProject')
       } else {
          res.send(" mot de passe incorrect")
       }
         
       }else {
          res.send('identifiant faux')
       }
    } catch (err) {
       res.send(err);
    }
 })

 logintRouter.get('/deconnect',async (req,res)=>{
    try{
        req.session.destroy()
    res.redirect('/')
    }catch (err) {
        res.send(err);
     }
    
 })

 module.exports = logintRouter