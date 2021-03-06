const checkConfig = require('./helpers/checkConfig');

const ENV = process.env;

const config = {
  PORT: ENV.PORT || 5000,
  REDIS_URL: ENV.REDIS_URL,
  NOTIFICATION_API_KEY: ENV.NOTIFICATION_API_KEY,
  DB_URL: ENV.DB_URL_DEV || ENV.DB_URL_PROD,
  TELEGRAM_TOKEN: ENV.TELEGRAM_TOKEN_DEV || ENV.TELEGRAM_TOKEN_PROD,
};

checkConfig(config);

module.exports = config;
