const { validationResult } = require('express-validator');

const queue = require('../queue');

const updateJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { body } = req;
    const job = await queue.getJob(id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    await job.update(body);

    return res.status(200).json({ message: 'Job has been updated successfully' });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = updateJob;
