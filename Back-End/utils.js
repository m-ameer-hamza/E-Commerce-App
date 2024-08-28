const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
//path to config-file
dotenv.config({ path: "./config.env" });

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendEmail = async (to, subject, text) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "az889480@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "az889480@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    const result = await transport.sendMail(mailOptions);

    return result;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
