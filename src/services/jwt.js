const jwt = require("jsonwebtoken");

const INTERNAL_SECRET = process.env.INTERNAL_SECRET || "secret";
const SHARED_SERET = process.env.SHARED_SECRET || "test-secret-here";

function createSession(data) {
  return jwt.sign(data, INTERNAL_SECRET, { expiresIn: "1h" });
}

function verifySession(token) {
  try {
    return jwt.verify(token, INTERNAL_SECRET);
  } catch (error) {
    throw error;
  }
}

function verifySharedToken(token) {
  try {
    return jwt.verify(token, SHARED_SERET);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createSession,
  verifySession,
  verifySharedToken,
};
