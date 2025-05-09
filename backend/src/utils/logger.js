"use strict";

const pino = require("pino");
// const config = require("config");

// Determine log level based on environment
const level = process.env.NODE_ENV !== "production" ? "info" : "error";

// Configure destinations
const destinations = [];
if (process.env.NODE_ENV === "production") {
  // Log to files in production
  destinations.push(
    pino.destination({ dest: "logs/combined.log", sync: false, mkdir: true }), // All logs (info and above)
    pino.destination({
      dest: "logs/errors.log",
      sync: false,
      mkdir: true,
      minLevel: "error",
    }) // Error logs only
  );
} else {
  // Pretty console output in development
  destinations.push(
    pino.transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss",
        ignore: "pid,hostname",
        messageFormat: "{levelLabel}: {msg}",
      },
    })
  );
}

// Create logger
const logger = pino(
  {
    level,
    base: undefined, // Remove default fields like pid, hostname
  },
  pino.multistream(destinations)
);

// Log initialization
logger.info("Setting up Pino logger");

module.exports = logger;
