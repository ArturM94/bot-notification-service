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
];

module.exports = {
  JOB_TYPES,
  REQUIRED_ENV,
};
