const express = require("express");
const ProjectModel = require('../model/project.js')
const multer = require("../customDependecies/multer")
const projectRouter = express.Router()
const routeGuard = require('../authGuard')
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: "fonsat.nodemailer@gmail.com",
      pass: "dlclhbrybfcawlgi",
   },
   tls: {rejectUnauthorized: false}

})
projectRouter.get('/', async (req, res) => {
   try {
      let projects = await ProjectModel.find();
      res.render('main.twig', {
         projects: projects
      })

   } catch (err) {
      res.send(err);
   }
})

projectRouter.get('/addProject', routeGuard, async (req, res) => {
   try {
      res.render('addform.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

projectRouter.post('/addProject', routeGuard, multer.single('image'), async (req, res) => {
   try {
      req.body.image = req.file.filename
      let project = new ProjectModel(req.body)
      project.save()
      res.redirect('/')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

projectRouter.get('/deleteproject/:id', async (req, res) => {
   try {
      await ProjectModel.deleteOne({ _id: req.params.id });
      res.redirect('/')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})



projectRouter.post('/sendMail',async (req,res)=>{
   try {
       await transporter.sendMail({
         from: req.body.mail, // sender address
         to: "JenniferMonikaStabenau@outlook.fr", // list of receivers
         subject: req.body.fname +" "+req.body.lname, // Subject line
         html: req.body.message, // html body
       });
       res.redirect('/')
   } catch (error) {
      console.log(error);
      res.send(error)
   }
  
})


module.exports = projectRouter


