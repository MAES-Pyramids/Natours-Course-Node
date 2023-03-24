const nodemailer = require('nodemailer');
//-----------------------------------------//
const sendMail = async options => {
  // 1) Create a transporter
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'Mohamed Abo El-Seoud <MAES@MAES.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // 3) Actually send the email
  await transport.sendMail(mailOptions);
};
//--------------------------------------------//
module.exports = sendMail;
