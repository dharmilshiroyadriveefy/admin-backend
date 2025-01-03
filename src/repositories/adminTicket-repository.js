"use strict";
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/common");
const { CustomerInquiries } = require("../models");
const { sequelize } = require("../models");
const { Op, Sequelize } = require("sequelize");

class AdminTicketRepository {
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
            const ticketDetails = await CustomerInquiries.update(
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
    async fetchCustomerByUuid(uniqueId) {
        try {
            const customerdata = await CustomerInquiries.findOne({
                where: { uniqueId: uniqueId },
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
            

            return customerdata;
        } catch (error) {
            
            throw new AppError(
                "Error occurred while fetching the customer details",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
        
    }

    async searchTickets(searchQuery) {
        try {
            const tickets = await CustomerInquiries.findAll({
                where: Sequelize.where(Sequelize.cast(Sequelize.col("uniqueId"), "TEXT"), {
                    [Op.like]: `%${searchQuery}%`,
                }),
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
            if (tickets.length === 0) {
                throw new AppError(
                    "No tickets found with the given search query",
                    StatusCodes.NOT_FOUND
                );
            }
            return tickets;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            } else {
                throw new AppError(
                    "Error occurred while searching the tickets",
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    async successfulClosuer(ticketId) {
        try {
            const ticket = await CustomerInquiries.findOne({
                where: { uniqueId: ticketId },
                attributes: ["email", "firstName", "lastName", "uniqueId"],
            });
            return ticket;
        } catch (error) {
            console.error("Error retrieving email by UUID:", error);
            throw new Error("An error occurred while retrieving the email address.");
        }
    }
}
module.exports = AdminTicketRepository;
