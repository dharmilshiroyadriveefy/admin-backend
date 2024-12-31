const express = require("express");
const router = express.Router();
const { AdminTicketController } = require("../../controllers");


router.get("/ticketlist", AdminTicketController.getTicketsList);
router.patch("/ticketstatus/:ticketId", AdminTicketController.updateTicketStatus);


module.exports = router;
