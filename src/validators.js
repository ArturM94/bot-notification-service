const { body, param } = require('express-validator');

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

module.exports = { idValidator, bodyValidator };
