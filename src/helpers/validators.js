const { body, param, query } = require('express-validator');

const { JOB_TYPES } = require('./constants');

const jobTypes = Object.values(JOB_TYPES);

const idValidator = [
  param('id', 'id should not be empty')
    .not().isEmpty(),
  param('id', 'id should be a string')
    .isString(),
];

const notificationValidator = [
  body('telegramId', 'telegramId should not be empty')
    .not().isEmpty(),
  body('telegramId', 'telegramId should be a string')
    .isString(),
  body('text', 'text should not be empty')
    .not().isEmpty(),
  body('text', 'text should be a string')
    .isString()
    .trim(),
  body('attachments', 'attachments should not be empty')
    .not().isEmpty(),
  body('attachments', 'attachments should be a string')
    .isString()
    .trim(),
  body('date', 'date should not be empty')
    .not().isEmpty(),
  body('date', 'date should comply with the ISO 8601 standard')
    .isISO8601(),
];

const jobTypeValidator = [
  query('jobTypes', 'jobTypes should not be empty')
    .not().isEmpty(),
  query('jobTypes', 'jobTypes should be an array')
    .isArray({ min: 1, max: jobTypes.length }),
  query('jobTypes', `jobTypes should contain only these values: ${jobTypes.join(', ')}`)
    .isIn(jobTypes),
];

module.exports = { idValidator, notificationValidator, jobTypeValidator };