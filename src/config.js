const checkConfig = require('./helpers/checkConfig');

const ENV = process.env;

const config = {
  PORT: ENV.PORT || 5000,
  REDIS_URL: ENV.REDIS_URL,
  NOTIFICATIONS_API_KEY: ENV.NOTIFICATIONS_API_KEY,
};

checkConfig(config);

module.exports = config;
