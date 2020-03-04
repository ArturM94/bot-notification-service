const { validationResult } = require('express-validator');

const calculateDelay = require('../helpers/calculateDelay');
const bullWrapper = require('../bull/wrapper');
const { BULL_METHODS } = require('../constants');

const addJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { body } = req;
    const { queue } = req.query;

    const delay = await calculateDelay(body.date);
    await bullWrapper(queue, BULL_METHODS.ADD, body, { delay });

    return res.status(200).json({ message: 'Job has been added successfully' });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = addJob;
