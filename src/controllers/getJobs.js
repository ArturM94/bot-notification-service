const { validationResult } = require('express-validator');

const bullWrapper = require('../bull/wrapper');
const { BULL_METHODS } = require('../constants');

const getJobs = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { queue } = req.query;
    const { jobTypes } = req.query;

    const jobs = await bullWrapper(queue, BULL_METHODS.GET_JOBS, [jobTypes]);

    if (!jobs.length) {
      return res.status(404).json({ error: 'Jobs not found' });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = getJobs;
