"use strict";

const error = require("../middlewares/error.mw");

const fixturesRoutes = require("../routes/fixtures.routes");

module.exports = function (app) {
  app.use("/api/fixtures", fixturesRoutes);

  app.use("/", (req, res) => {
    res.status(200).send("fulbo is online.");
  });

  app.use(error);
};
