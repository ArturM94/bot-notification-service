const { validationResult } = require('express-validator');

const queue = require('../queue');
const calculateDelay = require('../helpers/calculateDelay');
const logger = require('../helpers/logger');

const updateJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { body } = req;
    const job = await queue.getJob(id);

    if (!job) {
      return res.status(404).json({ error: `Job with id ${id} not found` });
    }

    const data = {
      text: body.text || job.data.text,
      image: body.image || job.data.image,
      sticker: body.sticker || job.data.sticker,
      date: body.date || job.data.date,
    };

    if (body.date !== job.data.date) {
      await job.remove();
      const delay = await calculateDelay(body.date);
      await queue.add(data, { delay, jobId: id });

      return res.status(200).json({ message: `Job with id ${id} has been updated successfully` });
    }

    await job.update(data);

    return res.status(200).json({ message: `Job with id ${id} has been updated successfully` });
  } catch (error) {
    logger.error(error);
    return res.sendStatus(500);
  }
};

module.exports = updateJob;
