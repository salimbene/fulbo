const axios = require("axios");
const fs = require("fs");
const path = require("path");
const config = require("config");
require("dotenv").config();

const API_URL = config.get("API-FOOTBALL.URL");
const API_KEY = config.get("API_FOOTBALL_KEY");

// Cargar datos locales para pruebas
const loadLocalFixtures = (leagueId, season, date) => {
  try {
    const filePath = path.join(__dirname, "../data/sample_fixtures.json");
    const rawData = fs.readFileSync(filePath);
    const fixturesData = JSON.parse(rawData);

    // Filtrar por liga, temporada y fecha
    return fixturesData.response.filter((fixture) => {
      const fixtureDate = fixture.fixture.date.split("T")[0]; // Extraer YYYY-MM-DD
      return (
        fixture.league.id === parseInt(leagueId) &&
        fixture.league.season === parseInt(season) &&
        (!date || fixtureDate === date)
      );
    });
  } catch (error) {
    throw new Error("Error loading local fixtures: " + error.message);
  }
};

// Consultar la API para datos reales
const getFixturesByDate = async (leagueId, season, date) => {
  try {
    const response = await axios.get(`${API_URL}/fixtures`, {
      params: {
        league: leagueId,
        season,
        date,
        timezone: "America/Argentina/Buenos_Aires",
      },
      headers: {
        "x-apisports-key": API_KEY,
      },
    });
    return response.data.response;
  } catch (error) {
    throw new Error(error.response?.data?.errors?.message || "API error");
  }
};

// Función principal que decide si usar datos locales o la API
const fetchFixturesByDate = async (leagueId, season, date, useLocal = true) => {
  if (useLocal) {
    return loadLocalFixtures(leagueId, season, date);
  }
  return getFixturesByDate(leagueId, season, date);
};

module.exports = { fetchFixturesByDate };
