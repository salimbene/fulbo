"use strict";
const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
  const { message, stack } = err;

  logger.info("[mw] error trigger: uncaught exception");
  logger.error(stack);

  if (message.includes("[mw] Unexpected token"))
    return res.status(400).send(message);

  // Send error to client
  return res.status(500).send(message);
  // return res.status(500).send(`[mw] server internal error - ${message}`);
};
