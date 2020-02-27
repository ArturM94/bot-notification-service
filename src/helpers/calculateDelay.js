/**
 * Calculates delay.
 *
 * @param {string} date Date in ISO 8601 standard
 * @return {number} Milliseconds
 */
module.exports.calculateDelay = (date) => Date.parse(date) - Date.now();
