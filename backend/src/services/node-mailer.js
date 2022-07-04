const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let Mailer = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "939db56664c1de",
        pass: "77f7067d187645"
    },
});

module.exports = Mailer