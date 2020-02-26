const { body, param, query } = require('express-validator');

const { JOB_TYPES } = require('./constants');

const jobTypes = Object.values(JOB_TYPES);

const idValidator = [
  param('id', 'ID is wrong. Should be a string')
    .not().isEmpty()
    .isString(),
];

const bodyValidator = [
  body('telegramId', 'Telegram ID is wrong. Should be a string')
    .not().isEmpty()
    .isString(),
  body('text', 'Text is wrong. Should be a string')
    .not().isEmpty()
    .isString()
    .trim(),
  body('attachments', 'Attachments is wrong. Should be a string')
    .not().isEmpty()
    .isString()
    .trim(),
  body('date', 'Date is wrong. Should comply with the ISO 8601 standard')
    .not().isEmpty()
    .isISO8601(),
];

const jobTypeValidator = [
  query('jobType', 'Job type is wrong. Should not be empty')
    .not().isEmpty(),
  query('jobType', `Job type is wrong. Should be one of ${jobTypes.join(', ')}`)
    .isIn(jobTypes),
];

module.exports = { idValidator, bodyValidator, jobTypeValidator };
