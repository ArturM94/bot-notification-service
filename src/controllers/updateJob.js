const { validationResult } = require('express-validator');

const bullWrapper = require('../bull/wrapper');
const { BULL_METHODS } = require('../constants');
const calculateDelay = require('../helpers/calculateDelay');

const updateJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { body } = req;
    const { queue } = req.query;

    const job = await bullWrapper(queue, BULL_METHODS.GET_JOB, id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const data = {
      text: body.text || job.data.text,
      attachments: body.attachments || job.data.attachments,
      date: body.date || job.data.date,
    };

    if (body.date !== job.data.date) {
      await job.remove();
      const delay = await calculateDelay(body.date);
      await bullWrapper(queue, BULL_METHODS.ADD, data, { delay });

      return res.status(200).json({ message: 'Job has been updated successfully' });
    }

    await job.update(data);

    return res.status(200).json({ message: 'Job has been updated successfully' });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = updateJob;
