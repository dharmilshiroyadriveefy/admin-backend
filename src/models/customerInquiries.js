"use strict";


const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {


    class CustomerInquiries extends Model {}


    CustomerInquiries.init(
        {
            firstName:
            {
                type: DataTypes.STRING,
                allowNull: false, // Mandatory field
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false, // Mandatory fieldfirstName
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            uniqueId:
            {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Automatically generate UUID v4
                allowNull: false,
            },
            isResolved: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false, // Default value
            },
            mailSendStatus: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "CustomerInquiries",
            tableName: "Customer_Inquiries",
            timestamps: true,
        }
    );


    return CustomerInquiries;
};