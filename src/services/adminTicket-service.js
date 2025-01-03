const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../utils/common");
const dotenv = require("dotenv");
const { ContactUsRepository, AdminTicketRepository } = require("../repositories");
const { sendEmailCustomer, sendEmailOwner, successfulClosureMail } = require("./email-service");
const contactUsRepository = new ContactUsRepository();
const adminTicketRepository = new AdminTicketRepository();
dotenv.config();

async function getTicketsList(req) {
    try {
        const tickets = await adminTicketRepository.getTicketsList();
        return tickets;
    } catch (error) {
        throw new AppError(
            "An unexpected error occurred while fetching the tickets list",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateTicketStatus(req) {
    const { ticketId } = req.params;
    try {
        const customer = await adminTicketRepository.fetchCustomerByUuid(ticketId);
        if (!customer) {
            throw new AppError("Ticket not found", StatusCodes.NOT_FOUND);
        }
        const ticket = await adminTicketRepository.updateTicketStatus(ticketId);
        return {
            success: true,
            message: "Ticket status updated successfully",
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError(
                "An unexpected error occurred while updating the ticket status",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

async function getTicketDetails(req) {
    const { ticketId } = req.params;

    try {
        const customer = await adminTicketRepository.fetchCustomerByUuid(ticketId);
        return customer;
    } catch (error) {
        throw new AppError(
            "An unexpected error occurred while fetching the customer details",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function searchTicket(req) {
    const { searchQuery } = req.query;
    try {
        const tickets = await adminTicketRepository.searchTickets(searchQuery);

        return tickets;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new AppError(
                "An unexpected error occurred while searching the tickets",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

async function successfulClosuer(req) {
    const { ticketId } = req.params;

    try {
        const ticket = await adminTicketRepository.successfulClosuer(ticketId);
        await successfulClosureMail(ticket);
        return {
            success: true,
            message: "Ticket closed successfully",
        };
    } catch (error) {
        console.error(error);
        throw new AppError(
            "An unexpected error occurred while fetching the customer details",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    getTicketsList,
    updateTicketStatus,
    getTicketDetails,
    searchTicket,
    successfulClosuer,
};
