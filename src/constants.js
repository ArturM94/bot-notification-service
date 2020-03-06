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
  'NOTIFICATION_API_KEY',
  'DB_URL',
  'TELEGRAM_TOKEN',
];

module.exports = {
  TELEGRAM_API,
  JOB_TYPES,
  REQUIRED_ENV,
};
