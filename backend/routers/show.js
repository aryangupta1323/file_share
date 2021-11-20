const router = require('express').Router();
const File=require("../modals/file")

router.get("/:uuid",(req,res)=>{
  File.findOne({uuid:req.params.uuid},(err,foundFile)=>{
    if(!err){
      if(foundFile){
          res.render("download",{fileName:foundFile.fileName,
            fileSize:foundFile.size,
            downloadLink:`${process.env.APP_BASE_URL}/files/download/${foundFile.uuid}`
          })
      }
      else {
        res.render("download",{err:"link has expired"})
      }
    }
  })

})

module.exports=router;
