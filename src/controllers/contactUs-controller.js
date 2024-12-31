const { StatusCodes } = require("http-status-codes");
const { ContactUsService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createTicket(req, res) {
    try {
        const user = await ContactUsService.createTicket(req);
        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}





module.exports = { createTicket };
