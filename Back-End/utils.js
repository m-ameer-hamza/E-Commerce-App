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
      html: `
        <div
          style="display: flex; justify-content: center; align-items: center; padding: 0; margin: 0; background-color: #f5f5f5; width: 100%;"
        >
          <table 
            style="max-width: 600px; background-color: #ffffff; border-radius: 10px; padding: 20px; width: 100%; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
            cellpadding="0" cellspacing="0">
            <tr>
              <td style="text-align: center; padding-bottom: 20px;">
                
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">
                <h3 style="font-size: 22px; color: #333;">Email Verification Code</h3>
                <p style="font-size: 16px; color: #555;">We are sending this email because you created an account or applied for a password reset.</p>
                <p style="font-size: 16px; color: #555;">This OTP is used to verify your email address and will <strong>expire after 5 minutes</strong>.</p>
                <h4 style="font-size: 18px; color: #333; margin-top: 20px;">Verification Code:</h4>
                <h2 
                  style="color: rgb(0, 119, 255); font-size: xx-large; letter-spacing: 1.2px; font-weight: 600; font-style: italic; margin-bottom: 20px;">
                  ${text}
                </h2>
                <p style="font-size: 16px; color: #555;">Use this code to verify your email. If you did not request this, please ignore this message.</p>
                <p style="font-size: 16px; color: #555;">Do not share this code with anyone.</p>
                <h4 style="font-size: 16px; color: #333; margin-top: 30px;">Thank you. Stay Happy. Keep Shopping!</h4>
              </td>
            </tr>
          </table>
        </div>
      `,
      text: `Your OTP is ${text}`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully to the user", result);
    return result;
  } catch (error) {
    console.log("Error in sending email", error);
    console.log(error.message);
    return error;
  }
};
