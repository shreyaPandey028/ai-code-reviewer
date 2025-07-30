require('dotenv').config();
const app = require('./src/app');

// ❌ DO NOT call app.listen here
// ✅ Just export the app
module.exports = app;