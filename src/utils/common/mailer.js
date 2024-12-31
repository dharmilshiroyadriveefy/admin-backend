const nodemailer =  require("nodemailer")
const ejs =  require("ejs")
const path =  require("path")
const fileURLToPath  =  require('url');
const {emailConfig} =  require("../../config/email-config.js");


// Get __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// Create a transporter
const transporter = nodemailer.createTransport(emailConfig);


// Function to send the email
const sendEmail = async (to, subject,templateName, context) => {
    try {
        const templatePath = path.join(__dirname, '../../views', `${templateName}.ejs`);
        const htmlContent = await ejs.renderFile(templatePath, context);

        const mailOptions = {
            from: 'dharmil@driveefy.com', // sender address
            to: to, // list of receivers,
            subject,
            html: htmlContent,
        };
        return transporter.sendMail(mailOptions);

    } catch (error) {
        throw new Error(`Error sending email: ${error.message}`);
    }
};

module.exports = {sendEmail};