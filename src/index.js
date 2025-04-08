const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require('cors');
require("./connectionDB");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routes(app);
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
