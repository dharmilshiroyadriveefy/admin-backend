const crypto = require('crypto');

// Define encryption settings
const algorithm = 'aes-256-cbc';
const secretKey ="wedcyfjdkwivnwhslkudcwusfhibsjde"; // Generate a secure key
const iv = crypto.randomBytes(16); // Initialization vector

// Encrypt function
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted  };
}
// Decrypt function
function decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = { encrypt, decrypt };


