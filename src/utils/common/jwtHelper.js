const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET; // Use a secret environment variable or a default value
const TOKEN_EXPIRATION = "30d"; // Token expires in 1 hour

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {
    generateToken,
    verifyToken,
};
