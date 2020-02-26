const { validationResult } = require('express-validator');

const queue = require('../queue');

const deleteJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const job = await queue.getJob(id);

    if (job === null) {
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
