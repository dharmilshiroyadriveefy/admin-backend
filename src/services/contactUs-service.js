const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/common");
const dotenv = require("dotenv");
const { ContactUsRepository } = require("../repositories");
const { sendEmailCustomer, sendEmailOwner } = require("./email-service"); 
const contactUsRepository = new ContactUsRepository();
dotenv.config();

async function createTicket(req) {
    const { firstName, lastName, email, phoneNumber, description } = req.body;
    const customerData = req.body;
    const ownerEmail = process.env.EMAIL_RECEIVER_OWNER;
    try {
        const customer = await contactUsRepository.registerCustomer(customerData);
        await sendEmailCustomer(customer);
        await sendEmailOwner(ownerEmail, customer);
        await contactUsRepository.updateMailSendStatus(customer.id);
        return {
            "success": true,
            "message": "Ticket created successfully",
        };
    } catch (error) {
        console.log(error);
        throw new AppError(
            "An unexpected error occurred while creating the customer by local method",
            error.statusCode
        );
    }
}

// async function getCustomerByUuid(req) {
//     console.log("in service");
//     const { unique_Id } = req.params;
//     if (!unique_Id) {
//         // If no unique_Id is provided in the request, return a bad request
//         throw new AppError("Unique ID is required", StatusCodes.BAD_REQUEST);
//     }

//     try {
//         const customer = await contactUsRepository.fetchCustomerByUuid(unique_Id);
//         return customer;
//     } catch (error) {
//         console.error(error);
//         throw new AppError(
//             "An unexpected error occurred while fetching the customer details",
//             StatusCodes.INTERNAL_SERVER_ERROR
//         );
//     }
// }



module.exports = { createTicket };
