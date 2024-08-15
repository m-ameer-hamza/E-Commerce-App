const nodemailer = require("nodemailer");
const { promisify } = require("util");
const dotenv = require("dotenv");

//path to config-file
dotenv.config({ path: "./config.env" });
console.log(process.env.NODE_MAILER_PASS);
// Create a transporter with promisified sendMail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "az889480@gmail.com",
    pass: process.env.NODE_MAILER_PASS,
  },
});
const sendMailPromise = promisify(transporter.sendMail).bind(transporter);

exports.ResetMailHandler = async (OTP) => {
  const mailOptions = {
    from: "az889480@gmail.com",
    to: "az889480@gmail.com",
    subject: "Password Reset OTP",
    text: "Your password reset OTP is:" + OTP,
  };

  try {
    // Sending the email and waiting for it to be sent
    await sendMailPromise(mailOptions);
    console.log("Email sent successfully");
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
};
