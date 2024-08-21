// const fs = require("fs");
// const { google } = require("googleapis");
// const nodemailer = require("nodemailer");

// // Load client secrets from a local file.
// fs.readFile("credentials.json", (err, content) => {
//   if (err) return console.log("Error loading client secret file:", err);
//   authorize(JSON.parse(content), sendEmail);
// });

// // Authorize a client with credentials, then call the Gmail API.
// function authorize(credentials, callback) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Check if we have previously stored a token.
//   fs.readFile("token.json", (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/gmail.send"],
//   });
//   console.log("Authorize this app by visiting this url:", authUrl);
//   const rl = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question("Enter the code from that page here: ", (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error("Error retrieving access token", err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile("token.json", JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log("Token stored to", "token.json");
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

// function sendEmail(auth) {
//   const gmail = google.gmail({ version: "v1", auth });

//   // Set up Nodemailer
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "az889480@gmail.com",
//       clientId: auth._clientId,
//       clientSecret: auth._clientSecret,
//       refreshToken: auth.credentials.refresh_token,
//       accessToken: auth.credentials.access_token,
//     },
//   });

//   const mailOptions = {
//     from: "az889480email@gmail.com",
//     to: "az889482@gmail.com",
//     subject: "Test Email from Node.js",
//     text: "Hello from Node.js using the Gmail API!",
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("Email sent: " + info.response);
//   });
// }
