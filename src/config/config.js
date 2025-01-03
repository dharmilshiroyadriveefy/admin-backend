require("dotenv").config(); // Load environment variables from .env file

module.exports = {
    development: {
        username: "postgres",
        password: "bwVP5>91l1D81g",
        database: "driveefy-test-environment-database",
        host: "database-admin-test.c5yc4qcwqys0.ap-south-1.rds.amazonaws.com",
        dialect: "postgres",
        logging:false,
        port: "5432",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
    },
};
