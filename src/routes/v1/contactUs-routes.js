const express = require("express");
const router = express.Router();

const { ContactUsController } = require("../../controllers");
const { ContactUsInquiriesMiddlewar } = require("../../middlewares");

router.post(
    "/registercustomer",
    ContactUsInquiriesMiddlewar.validatecustomerRegisteration,
    ContactUsController.createTicket
);



module.exports = router;
