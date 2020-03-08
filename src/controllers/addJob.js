const { validationResult } = require('express-validator');

const calculateDelay = require('../helpers/calculateDelay');
const queue = require('../queue');
const logger = require('../helpers/logger');

const addJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { body } = req;
    const { id } = body;

    delete body.id;
    const delay = await calculateDelay(body.date);
    await queue.add(body, { delay, jobId: id });

    return res.status(200).json({ message: `Job with id ${id} has been added successfully` });
  } catch (error) {
    logger.error(error);
    return res.sendStatus(500);
  }
};

module.exports = addJob;
