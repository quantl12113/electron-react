const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quantl12113@gmail.com',
    pass: 'quanla12113!@#'
  }
});

const mailOptions = {
  from: 'quantl12113@gmail.com',
  to: 'quantl131197@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Welcome</h1><p>That was easy!</p>'
};

const sendMail = () => transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = { sendMail };