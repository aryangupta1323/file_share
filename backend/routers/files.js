require("dotenv").config();
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../modals/file');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '/uploads')) ,
    filename: (req, file, cb) => {
        const uniqueName = new Date().toISOString().replace(/:/g, '-') + file.originalname;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
      if(!req.file)
       return res.send({error:"all fields required"})
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      console.log(req.file.filename);
      console.log(req.file.path);
      console.log(req.file.size);
        const file = new File({
            fileName: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
      });
});
module.exports = router;


router.post("/send",(req,res)=>{
  const {sender,reciever,uuid}=req.body;
  File.findOne({uuid:uuid},(err,foundFile)=>{
    if(foundFile.sender)
    res.send({error:"file had already been sent"})
    else{
      foundFile.sender=sender;
      foundFile.reciever=reciever;
      const sendMail=require("../services/sendEmail")
      sendMail({
        sender:sender,
        reciever:reciever,
        subject:"File I have sent to you",
        html: require("../services/htmlTemplate")({
          emailFrom:sender,
          downloadLink:`${process.env.APP_BASE_URL}/files/download/${foundFile.uuid}`,
          size:`${foundFile.size/1000}KB`,
          expires:"Expires in 24 hours"
        })
      })
      res.send({success:"Email sent successfully"})
    }
  })
})
