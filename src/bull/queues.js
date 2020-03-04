const Queue = require('bull');

const config = require('../config');
const { BULL_QUEUES } = require('../constants');

const { REDIS_URL } = config;

const QueuesHandler = {
  [BULL_QUEUES.TOP_SPEAKERS]: new Queue(BULL_QUEUES.TOP_SPEAKERS, REDIS_URL),
  [BULL_QUEUES.FOOD_EVENTS]: new Queue(BULL_QUEUES.FOOD_EVENTS, REDIS_URL),
  [BULL_QUEUES.FOR_MOOD]: new Queue(BULL_QUEUES.FOR_MOOD, REDIS_URL),
};

module.exports = QueuesHandler;
