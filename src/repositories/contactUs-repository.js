"use strict";
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/common");
const { CustomerInquiries } = require("../models");
const { sequelize } = require("../models");

class ContactUsRepository  {
    async registerCustomer(customerData) {
        const transaction = await sequelize.transaction();
        try {
            const Customer = await CustomerInquiries.create(customerData, { transaction });
            await transaction.commit();
            return Customer;
        } catch (error) {
            await transaction.rollback();
            throw new AppError(
                "Error occurred while registering customer",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async updateMailSendStatus(customerId) {
        const transaction = await sequelize.transaction();
        try {
            await CustomerInquiries.update(
                { mailSendStatus: true },
                { where: { id: customerId }, transaction }
            );
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new AppError(
                "Error occurred while updating mailSendStatus",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }


    async fetchCustomerByUuid(uniqueId) {
        try {
            console.log("uuid", uniqueId);
            const customerdata = await CustomerInquiries.findOne({
                where: { uniqueId: uniqueId.trim() },
                attributes: [
                    "firstName",
                    "lastName",
                    "email",
                    "phoneNumber",
                    "description",
                    "uniqueId",
                    "isResolved",
                    "mailSendStatus",
                    "createdAt",
                    "updatedAt",
                ],
            });
            console.log(customerdata);

            return customerdata;
        } catch (error) {
            console.error(error);
            throw new AppError(
                "Error occurred while fetching the customer details",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports = ContactUsRepository;
