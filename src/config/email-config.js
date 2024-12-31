const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Define the email configuration
const emailConfig = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465, // Default to 465 if EMAIL_PORT is not set
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER || "dharmil@driveefy.com", // Use env variable or default
        pass: process.env.EMAIL_PASS,
    },
};


module.exports = { emailConfig } ;
