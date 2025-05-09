const apiFootballService = require("../services/apiFootballService");

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
        id: fixture.fixture.id,
        date: fixture.fixture.date,
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        homeGoals: fixture.goals.home,
        awayGoals: fixture.goals.away,
        status: fixture.fixture.status.long,
        venue: fixture.venue.name,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = { getDailyFixtures };
