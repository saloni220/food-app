const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();  
const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Email Error:", error);
  }
};
module.exports = sendMail;

