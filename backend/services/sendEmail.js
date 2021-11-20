const nodemailer=require("nodemailer")
function sendMail({sender,reciever,subject,text,html}){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: sender,
  to: reciever,
  subject: subject,
  text: text,
  html:html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
module.exports=sendMail;
