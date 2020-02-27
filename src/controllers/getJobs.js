const { validationResult } = require('express-validator');

const queue = require('../queue');

const getJobs = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { jobTypes } = req.query;
    const jobs = await queue.getJobs([jobTypes]);

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = getJobs;
