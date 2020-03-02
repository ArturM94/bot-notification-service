const config = require('../config');

const verifyApiKey = (req, res, next) => {
  const { NOTIFICATIONS_API_KEY } = config;
  const userApiKey = req.headers.api_key;

  if (userApiKey === NOTIFICATIONS_API_KEY) {
    next();
  } else {
    console.error('User\'s API Key is incorrect or not specified!');
    res.status(401).json({
      error: 'Incorrect Auth token!',
    });
  }
};

module.exports = verifyApiKey;