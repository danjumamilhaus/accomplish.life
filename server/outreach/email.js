// var newGoalEmail = function(goalID, email, backers) {

//   var params = {
//     Destination: {
//       CcAddresses: backers,
//       ToAddresses: [email]
//     },
//     Message: {
//       Body: {
//         Html: {
//           Data: 'STRING_VALUE', /* required */
//           Charset: 'UTF-8'
//         },
//         Text: {
//           Data: 'STRING_VALUE', /* required */
//           Charset: 'UTF-8'
//         }
//       },
//       Subject: { /* required */
//         Data: 'New Goal!', /* required */
//         Charset: 'UTF-8'
//       }
//     },
//     Source: 'STRING_VALUE', /* required */
//     ConfigurationSetName: 'STRING_VALUE',
//     ReplyToAddresses: [
//       'STRING_VALUE',
//       /* more items */
//     ],
//     ReturnPath: 'STRING_VALUE',
//     ReturnPathArn: 'STRING_VALUE',
//     SourceArn: 'STRING_VALUE',
//     Tags: [
//       {
//         Name: 'STRING_VALUE', /* required */
//         Value: 'STRING_VALUE' /* required */
//       },
//       /* more items */
//     ]
//   };
//   ses.sendEmail(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// };

require('dotenv').load({path: '../../emailKeys.env'});
var nodemailer = require('nodemailer');

// Transport object
var transporter = nodemailer.createTransport({
  service: 'SendPulse',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW
  }
});

// Verify connection configuration
// transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }
// });

var newGoalEmail = function(user, backerName, backerEmail, goalTitle) {
  // Setup email data
  var mailOptions = {
    from: 'Accomplish.io ' + process.env.EMAIL_USER, // sender address
    to: 'backerName backerEmail', // list of receivers
    subject: 'A friend of yours started a new goal!', // Subject line
    // text: 'goalTitle', // plain text body
    html: '<b>goalTitle</b>', // html body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

module.exports = {
  newGoalEmail: newGoalEmail
};
