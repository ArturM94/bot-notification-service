const { body, param, query } = require('express-validator');

const { JOB_TYPES } = require('./constants');

const jobTypes = Object.values(JOB_TYPES);

const idValidator = [
  param('id', 'ID is wrong')
    .not().isEmpty()
    .isString(),
];

const bodyValidator = [
  body('telegramId', 'Telegram ID is wrong')
    .not().isEmpty()
    .isString(),
  body('text', 'Text is wrong')
    .not().isEmpty()
    .isString()
    .trim(),
  body('attachments', 'Attachments is wrong')
    .not().isEmpty()
    .isString()
    .trim(),
  body('date', 'Date is wrong')
    .not().isEmpty()
    .isISO8601(),
];

const jobTypeValidator = [
  query('jobType', `Job type is wrong. Should be one of ${jobTypes.join(', ')}`)
    .isIn(jobTypes),
];

module.exports = { idValidator, bodyValidator, jobTypeValidator };
