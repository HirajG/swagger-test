const dotenv = require('dotenv').config();
const app = require('../api/index'); // ✅ make sure this matches
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
