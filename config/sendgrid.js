// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'saudamini.keshav@gmail.com',
  from: 'saudamini.keshav@gmail.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("works");
//   }, error => {
//     console.error(error);
//     console.log("error");

//     if (error.response) {
//       console.error(error.response.body)
//       console.log("error");
//     }
//   });
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);
//     console.log("error");

//     if (error.response) {
//       console.error(error.response.body)
//       console.log("error");
//     }
//   }
// })();

module.exports = sgMail;