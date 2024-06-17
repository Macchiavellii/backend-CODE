require('dotenv').config();

module.exports = {
  serverPort: process.env.SERVER_PORT,
  secretKey: process.env.JWT_SECRET,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS 
};
