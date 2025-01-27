const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
//const { MongoClient, ObjectId } = require('mongodb');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Call Routes
const userRoutes = require("./routes/user.routes");
const apiRoutes = require("./routes/api.routes");
const { dbConnection } = require("./database/config");

(async () => {
  await dbConnection();
  app.use("/api", apiRoutes);
  app.use("/api", userRoutes);
})();

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
