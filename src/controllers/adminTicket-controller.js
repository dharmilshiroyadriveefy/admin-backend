const { StatusCodes } = require("http-status-codes");
const { AdminTicketService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


async function getTicketsList(req, res) {
    try {
        const customer = await AdminTicketService.getTicketsList(req);
        SuccessResponse.data = customer;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function updateTicketStatus(req, res) {
    try {
        const user = await AdminTicketService.updateTicketStatus(req);
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}
async function getTicketDetails(req,res) {
    try {
        const user = await AdminTicketService.getTicketDetails(req);
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        console.log(error)
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    
}

async function searchTicket(req,res) {
    try {
        const user = await AdminTicketService.searchTicket(req);
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        console.log(error)
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    
}
async function successfulClosuer(req, res) {
    try {
        const result = await AdminTicketService.successfulClosuer(req);
        SuccessResponse.data = result;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}



module.exports = {  getTicketsList,updateTicketStatus,getTicketDetails,searchTicket,successfulClosuer };
