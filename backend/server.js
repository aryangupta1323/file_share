const express=require("express");
const path=require("path")
const bodyParser=require("body-parser")
const PORT = process.env.PORT || 3000;
const app=express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use("/api/files",require("./routers/files"))
app.use("/files",require("./routers/show"))
app.use("/files/download",require("./routers/download"))
app.listen(PORT,()=>{
  console.log("Server started on port 3000");
})
