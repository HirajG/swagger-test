const dotenv = require('dotenv').config();
const app = require('../app'); // ✅ Go up by one level
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
