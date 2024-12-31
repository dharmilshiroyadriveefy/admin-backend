const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,  
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME, 
};
