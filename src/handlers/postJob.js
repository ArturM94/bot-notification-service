const { validationResult } = require('express-validator');

const { calculateDelay } = require('../helpers/calculateDelay');
const { queue } = require('../queue');

module.exports.postJob = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({ errors: errors.array() });
    }

    const { body } = req;
    const delay = await calculateDelay(body.date);
    await queue.add(body, { delay });

    res.status(200).json({ message: 'Job has been added successfully' });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
