const { validationResult } = require('express-validator');

const queue = require('../queue');

module.exports.deleteJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const job = await queue.getJob(id);

    if (job === null) {
      res.status(404).json({ error: 'Job not found' });
    }

    await job.remove();

    res.status(200).json({ message: 'Job has been removed successfully' });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
