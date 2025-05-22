const dotenv = require('dotenv').config();
const app = require('../app'); // ✅ Go up one level
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
