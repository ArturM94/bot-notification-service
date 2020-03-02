const { REQUIRED_ENV } = require('../constants');

const checkConfig = (config) => {
  REQUIRED_ENV.forEach((item) => {
    if (!config[item]) {
      console.error(`The required environment variable "${item}" has not been defined!`);
      process.exit(1);
    }
  });
};

module.exports = checkConfig;
