"use strict";
require("dotenv").config();

const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = config.get("SERVER_PORT") || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Logging HTTP requests in development mode
const env = process.env.NODE_ENV;
if (env === "development") {
  app.use(morgan("dev"));
}

// Express routes setup
require("./startup/routes")(app);

app.listen(port, () => console.log(`Fulbo API running on port ${port}`));
