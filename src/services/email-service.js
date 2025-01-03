const {SendEmail} = require("../utils/common");
const { AppError } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

const sendEmailCustomer = async (Customer) => {
    const subject = " Ticket Raised for Query Assistance";
    const template = "contactUsUserTemplate";
    const context = {
        userName: `${Customer.firstName} ${Customer.lastName}`,
        uniqueId: Customer.uniqueId,
    };

    try {
        await SendEmail.sendEmail(Customer.email, subject, template, context);
        
    } catch (error) {
        console.log(error);
        throw new AppError("Error occurred while sending email to customer", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const sendEmailOwner = async (ownerEmail, Customer) => {
    const subject = "New Ticket Raised for Query Assistance";
    const template = "contactUsOwnerTemplate";
    const context = {
        userName:`${Customer.firstName} ${Customer.lastName}`,
        email: Customer.email,
        description: Customer.description,
        phoneNumber: Customer.phoneNumber,
        uniqueId: Customer.UniqueId,
        mailSendStatus: Customer.mailSendStatus,
    };
    try {
        await SendEmail.sendEmail(ownerEmail, subject, template, context);
    } catch (error) {
        throw new AppError("Error occurred while sending email to owner", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const successfulClosureMail = async (ticket) => {
    const subject = ` Your Ticket Has Been Closed`;
    const template = "successfulTicketResolved";
    console.log(ticket)
    const context = {
        uniqueId:ticket.uniqueId,
        userName: `${ticket.firstName} ${ticket.lastName}`,
        
    };
    try {
        await SendEmail.sendEmail(ticket.email, subject, template, context);
    } catch (error) {
        console.log(error)
        throw new AppError("Error occurred while sending email to cutomer", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
  sendEmailCustomer,
  sendEmailOwner,
  successfulClosureMail
};
