const { validationResult } = require('express-validator');

const { queue } = require('../queue');

module.exports.putJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { body } = req;
    const job = await queue.getJob(id);

    if (job === null) {
      res.status(404).json({ error: 'Job not found' });
    }

    await job.update(body);

    res.status(200).json({ message: 'Job has been updated successfully' });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
