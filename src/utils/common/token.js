const crypto =  require("crypto");

/**
 * Generate a random email verification token
 * @returns {string} The generated token
 */
const tokenGenerator = () => {
  return crypto.randomBytes(20).toString('hex');
};

module.exports = { tokenGenerator };
