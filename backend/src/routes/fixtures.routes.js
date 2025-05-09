// src/routes/fixturesRoutes.js
const express = require("express");
const router = express.Router();
const fixturesController = require("../controllers/fixtures.ctrl");

router.get("/daily", fixturesController.getDailyFixtures);

module.exports = router;
