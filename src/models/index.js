// const { Sequelize, DataTypes } = require("sequelize");
// const config = require("../config/config.json");

// // Initialize Sequelize
// const sequelize = new Sequelize(config.development);

// // Import models
// const CustomerInquiries = require("./customerInquiries")(sequelize,DataTypes);

// // Associate models
// const models = {
//     CustomerInquiries
// };

// // Loop through and associate models
// Object.keys(models).forEach((modelName) => {
//     if (models[modelName].associate) {
//         models[modelName].associate(models);
//     }
// });

// // Sync Sequelize with the database
// sequelize
//     .sync({ alter: true })
//     .then(() => {
//         console.log("Database synchronized successfully!");
//     })
//     .catch((error) => {
//         console.error("Error synchronizing the database:", error);
//     });

// module.exports = {
//     sequelize,
//     ...models,
// };



"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Database synchronized successfully!");
    })
    .catch((error) => {
        console.error("Error synchronizing the database:", error);
    });
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

