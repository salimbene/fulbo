const apiFootballService = require("../services/apiFootball.srv");

const asyncHandler = require("../utils/asyncHandler");

const logger = require("../utils/logger");

const getDailyFixtures = asyncHandler(async (req, res) => {
  try {
    const leagueId = "128"; // Liga Profesional Argentina
    const season = "2023"; // Temporada permitida
    const date = "2023-01-28"; // Fecha fija para pruebas (puede venir de req.query.date)

    logger.info(`Handling request for daily fixtures: ${date}`);
    const fixtures = await apiFootballService.fetchFixturesByDate(
      leagueId,
      season,
      date,
      true
    ); // true para usar datos locales
    res.json({
      success: true,
      data: fixtures.map((fixture) => ({
        homeTeam: fixture.teams.home?.name || "Unknown",
        awayTeam: fixture.teams.away?.name || "Unknown",
        homeGoals: fixture.goals.home ?? null,
        awayGoals: fixture.goals.away ?? null,
        status: fixture.fixture.status.long || "Unknown",
        venue: fixture.venue?.name || "Unknown",
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = { getDailyFixtures };
