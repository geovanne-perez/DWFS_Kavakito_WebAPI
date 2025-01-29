const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors') // importamos CORS
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3000;

// Call Swagger
bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
swaggerConfig = require("./swaggerConfig");


//Middlewares
app.use(cors())
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

const specs = swaggerJsdoc(swaggerConfig.options);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
  console.log("API documentation at http://localhost:" + port + "/api/docs");
});
