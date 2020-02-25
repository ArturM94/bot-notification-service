const { validationResult } = require('express-validator');

module.exports.delete = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(422).json({ errors: errors.array() });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
