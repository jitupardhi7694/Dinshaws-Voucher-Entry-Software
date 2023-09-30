const nodemailer = require('nodemailer');
const logger = require('./winston');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'itsupport06@dinshaws.co.in', // generated ethereal user
        pass: 'ibrwlfmcyyndwupm', // generated ethereal password
    },
});

// send mail with defined transport object
async function sendEmails(mailOptions) {
    // check if mailOptions has all the required property, if not replace with default options
    const defaultOptions = {
        from: 'Dinshaws Software <itsupport06@dinshaws.co.in>',
        to: 'itsupport06@dinshaws.co.in',
        cc: '',
        bcc: '',
        subject: 'Email from Dinshaws Software',
        text: 'Default text of email from Dinshaws Software',
    };
    const normalizedEmailOptions = { ...defaultOptions, ...mailOptions };
    normalizedEmailOptions.html = normalizedEmailOptions.text; // copy text to add html option also
    // console.log(normalizedEmailOptions);

    transporter.sendMail(normalizedEmailOptions, (error, info) => {
        if (error) {
            return logger.error(error);
        }
        return logger.info('Message sent: %s', info.messageId);
    });
}

module.exports = sendEmails;
