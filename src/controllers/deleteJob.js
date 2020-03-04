const { validationResult } = require('express-validator');

const bullWrapper = require('../bull/wrapper');
const { BULL_METHODS } = require('../constants');

const deleteJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { queue } = req.query;

    const job = await bullWrapper(queue, BULL_METHODS.GET_JOB, id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.remove();

    return res.status(200).json({ message: 'Job has been removed successfully' });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = deleteJob;
