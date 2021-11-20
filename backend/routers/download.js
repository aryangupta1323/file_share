const router=require("express").Router();
const File=require("../modals/file")
router.get("/:uuid",(req,res)=>{
  File.findOne({uuid:req.params.uuid},(err,foundFile)=>{
    if(foundFile)
    { const path=`${foundFile.path}`
      res.download(path)
    }
    else {
      res.send("File not exist")
    }
  })
})

module.exports=router;
