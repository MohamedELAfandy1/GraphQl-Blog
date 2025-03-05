const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure JWT_SECRET_KEY is loaded

const auth = (token) => {
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return { userId: decoded.userId, role: decoded.role };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = auth;
