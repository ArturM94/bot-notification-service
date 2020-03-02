const authorization = require('./auth');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  authMiddleware: authorization,
  errorMiddleware,
};
