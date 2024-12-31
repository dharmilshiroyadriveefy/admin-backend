const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/common");
const dotenv = require("dotenv");
const { ContactUsRepository,AdminTicketRepository } = require("../repositories");
const { sendEmailCustomer, sendEmailOwner } = require("./email-service"); 
const contactUsRepository = new ContactUsRepository();
const adminTicketRepository = new AdminTicketRepository();
dotenv.config();


async function getTicketsList(req) {
    try {
        const tickets = await adminTicketRepository.getTicketsList();
        return tickets;
    }
    catch (error) {
        throw new AppError(
            "An unexpected error occurred while fetching the tickets list",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateTicketStatus(req) {
    const { ticketId } = req.params;
    try {
        const ticket = await adminTicketRepository.updateTicketStatus(ticketId);
        return {
            "success": true,
            "message": "Ticket status updated successfully",
        };
    } catch (error) {
        throw new AppError(
            "An unexpected error occurred while updating the ticket status",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {getTicketsList,updateTicketStatus };
