const { validationResult } = require('express-validator');

const queue = require('../queue');
const logger = require('../helpers/logger');

const getJobs = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { jobTypes } = req.query;
    const jobs = await queue.getJobs([jobTypes]);

    if (!jobs.length) {
      return res.status(404).json({ error: `Jobs with types ${jobTypes.join(', ')} not found` });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    logger.error(error);
    return res.sendStatus(500);
  }
};

module.exports = getJobs;
