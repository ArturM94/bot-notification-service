const { validationResult } = require('express-validator');

const queue = require('../queue');
const logger = require('../helpers/logger');

const getJobById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const job = await queue.getJob(id);

    if (!job) {
      return res.status(404).json({ error: `Job with id ${id} not found` });
    }

    return res.status(200).json(job);
  } catch (error) {
    logger.error(error);
    return res.sendStatus(500);
  }
};

module.exports = getJobById;
