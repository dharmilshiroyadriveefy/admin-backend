const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json");

// Initialize Sequelize
const sequelize = new Sequelize(config.development);

// Import models
const CustomerInquiries = require("./customerInquiries")(sequelize,DataTypes);

// Associate models
const models = {
    CustomerInquiries
};

// Loop through and associate models
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sync Sequelize with the database
sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("Database synchronized successfully!");
    })
    .catch((error) => {
        console.error("Error synchronizing the database:", error);
    });

module.exports = {
    sequelize,
    ...models,
};
