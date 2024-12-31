"use strict";
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/common");
const { CustomerInquiries } = require("../models");
const { sequelize } = require("../models");

class AdminTicketRepository  {
    
    async getTicketsList() {
        try {
            const tickets = await CustomerInquiries.findAll({
                attributes: [
                    "firstName",
                    "lastName",
                    "email",
                    "phoneNumber",
                    "description",
                    "uniqueId",
                    "isResolved",
                    "mailSendStatus",
                ],
            });
            return tickets;
        } catch (error) {
            throw new AppError(
                "Error occurred while fetching the tickets list",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async updateTicketStatus(ticketId) {
        const transaction = await sequelize.transaction();
        try {
            const ticketDetails=await CustomerInquiries.update(
                { isResolved: true },
                { where: { uniqueId: ticketId }, transaction }
            );
            await transaction.commit();
            return ticketDetails;
        } catch (error) {
            await transaction.rollback();
            throw new AppError(
                "Error occurred while updating ticket status",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports = AdminTicketRepository;
