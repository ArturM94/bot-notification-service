const authorization = require('./auth');
const { NotFoundError, ServerError } = require('./errorMiddleware');

module.exports = {
  authMiddleware: authorization,
  NotFoundError,
  ServerError,
};
