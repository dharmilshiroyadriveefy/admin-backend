const express = require("express");
const router = express.Router();

const contactUsRoutes=require('./contactUs-routes')
const adminTicketRoutes=require('./adminTicket-routes')




// /v1/

router.use("/landingweb",contactUsRoutes);
router.use("/admin/panel",adminTicketRoutes)



    
module.exports = router;