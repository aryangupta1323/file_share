require('dotenv').config();
const mongoose=require("mongoose")
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(process.env.MONGOOSE_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(()=>console.log("Database connected"));
// client.connect(err => {
//   const collection = client.db("inshare").collection("files");
//   // perform actions on the collection object
//   client.close();
// });
  mongoose.connect(process.env.MONGOOSE_CONNECTION_URL, {  useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected!"))
  .catch(error => console.log(error));
  // mongoose.connection.on('connected', function () {
  //   console.log('Mongoose default connection open to ' + dbURI);
  // });
  //
  // // If the connection throws an error
  // mongoose.connection.on('error',function (err) {
  //   console.log('Mongoose default connection error: ' + err);
  // });
  //
  // // When the connection is disconnected
  // mongoose.connection.on('disconnected', function () {
  //   console.log('Mongoose default connection disconnected');
  // });
const fileSchema=new mongoose.Schema({
  fileName:{type:String,required:true},
  path:{type:String,required:true},
  size:{type:Number,required:true},
  uuid:{type:String,required:true},
  sender:{type:String,required:false},
  reciever:{type:String,required:false}
},{timestamps:true})

module.exports=mongoose.model("File",fileSchema);
