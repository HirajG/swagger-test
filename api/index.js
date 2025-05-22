const serverless = require('serverless-http');
const app = require('../app'); // Actual Express app

module.exports = app; // ✅ for local dev
module.exports.handler = serverless(app); // ✅ for Vercel
