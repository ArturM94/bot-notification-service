const ENV = process.env;

module.exports = {
  PORT: ENV.PORT || 5000,
  REDIS_URL: ENV.REDIS_URL,
};