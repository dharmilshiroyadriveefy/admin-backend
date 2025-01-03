const express = require("express");
const router = express.Router();
const { AdminTicketController } = require("../../controllers");


router.get("/ticketlist", AdminTicketController.getTicketsList);
router.patch("/ticketstatus/:ticketId", AdminTicketController.updateTicketStatus);
router.get("/ticketdetails/:ticketId", AdminTicketController.getTicketDetails);
router.get("/ticketsearch", AdminTicketController.searchTicket);
router.get('/ticketclose/:ticketId',AdminTicketController.successfulClosuer);


module.exports = router;
