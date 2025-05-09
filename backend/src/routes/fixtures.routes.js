// src/routes/fixturesRoutes.js
const express = require("express");
const router = express.Router();
const fixturesController = require("../controllers/fixturesController");

router.get("/daily", fixturesController.getDailyFixtures);

module.exports = router;
