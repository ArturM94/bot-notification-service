const config = require('./config');

const { TELEGRAM_TOKEN } = config;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const JOB_TYPES = {
  WAITING: 'waiting',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
  DELAYED: 'delayed',
  PAUSED: 'paused',
};

const REQUIRED_ENV = [
  'REDIS_URL',
  'NOTIFICATIONS_API_KEY',
  'DB_URL',
  'TELEGRAM_TOKEN',
];

const BULL_QUEUES = {
  TOP_SPEAKERS: 'top-speakers',
  FOOD_EVENTS: 'food-events',
  FOR_MOOD: 'for-mood',
};

const BULL_METHODS = {
  ADD: 'add',
  GET_JOB: 'getJob',
  GET_JOBS: 'getJobs',
};

module.exports = {
  TELEGRAM_API,
  JOB_TYPES,
  REQUIRED_ENV,
  BULL_QUEUES,
  BULL_METHODS,
};
