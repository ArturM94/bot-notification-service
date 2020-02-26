const { body, param, query } = require('express-validator');

const { JOB_TYPES } = require('./constants');

const jobTypes = Object.values(JOB_TYPES);

const idValidator = [
  param('id', 'id should not be empty')
    .not().isEmpty(),
  param('id', 'id should be a string')
    .isString(),
];

const bodyValidator = [
  body('telegramId', 'telegramId should be a string')
    .not().isEmpty()
    .isString(),
  body('text', 'text should be a string')
    .not().isEmpty()
    .isString()
    .trim(),
  body('attachments', 'attachments should be a string')
    .not().isEmpty()
    .isString()
    .trim(),
  body('date', 'date should comply with the ISO 8601 standard')
    .not().isEmpty()
    .isISO8601(),
];

const jobTypeValidator = [
  query('jobType', 'jobType should not be empty')
    .not().isEmpty(),
  query('jobType', `jobType should be one of ${jobTypes.join(', ')}`)
    .isIn(jobTypes),
];

module.exports = { idValidator, bodyValidator, jobTypeValidator };
