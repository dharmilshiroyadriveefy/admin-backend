const {SendEmail} = require("../utils/common");
const { AppError } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");

const sendEmailCustomer = async (Customer) => {
    const subject = " Ticket has been railsed for query";
    const template = "contactUsUserTemplate";
    const context = {
        userName: `${Customer.firstName} ${Customer.lastName}`,
        UniqueId: Customer.UniqueId,
    };

    try {
        await SendEmail.sendEmail(Customer.email, subject, template, context);
        
    } catch (error) {
        console.log(error);
        throw new AppError("Error occurred while sending email to customer", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const sendEmailOwner = async (ownerEmail, Customer) => {
    const subject = "Query Raised";
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

module.exports = {
  sendEmailCustomer,
  sendEmailOwner
};
