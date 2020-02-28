const ENV = process.env;

module.exports = {
  PORT: ENV.PORT || 5000,
  REDIS_URL: ENV.REDIS_URL || false,
  NOTIFICATIONS_API_KEY: ENV.NOTIFICATIONS_API_KEY || false,
};
