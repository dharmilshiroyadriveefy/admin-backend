const { verifyToken } = require("../utils/common/jwtHelper");
const AppError = require("../utils/common/app-error");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { validate } = require("uuid");

// function authenticateJWT(req, res, next) {
//     const token = req.header("Authorization");

//     if (!token) {
//         return new AppError("Token not provided", StatusCodes.UNAUTHORIZED);
//     }

//     try {
//         const decoded = verifyToken(token);
//         req.user = decoded;

//         next();
//     } catch (error) {
//         console.log(error.message);
//         return new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
//     }
// }
function authenticateJWT(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Token not provided",
        });
    }

    try {
        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch (error) {
        ErrorResponse.message = error.message;
        ErrorResponse.error = new AppError(error, StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


const validateToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return new AppError("Token not provided", StatusCodes.UNAUTHORIZED);
    }
    next();
};

module.exports = { authenticateJWT, validateToken };
