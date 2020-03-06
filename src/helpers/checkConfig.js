const REQUIRED_ENV = [
  'REDIS_URL',
  'NOTIFICATION_API_KEY',
  'DB_URL',
  'TELEGRAM_TOKEN',
];

const checkConfig = (config) => {
  REQUIRED_ENV.forEach((item) => {
    if (!config[item]) {
      console.error(`The required environment variable "${item}" has not been defined!`);
      process.exit(1);
    }
  });
};

module.exports = checkConfig;
