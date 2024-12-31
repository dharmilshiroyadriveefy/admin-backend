const { StatusCodes } = require("http-status-codes");
const { validate } = require("uuid");

function validatecustomerRegisteration(req, res, next) {
    //console.log("entered in validation");
    const data = req.body;
    const { firstName, email, phoneNumber } = data;

    const errors = [];

    if (!firstName) {
        errors.push({ field: "firstName", message: "First name cannot be empty" });
    }

    if (!email) {
        errors.push({ field: "email", message: "Email cannot be empty" });
    }
    if (!phoneNumber) {
        errors.push({ field: "phoneNumber", message: "Mobile number cannot be empty" });
    } else if (phoneNumber.length !== 10) {
        errors.push({ field: "phoneNumber", message: "Mobile number must be 10 digits" });
    }
    // If there are errors, return them as a response
    if (errors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Validation failed",
            errors: errors,
        });
    }

    next();
}
module.exports = { validatecustomerRegisteration };
