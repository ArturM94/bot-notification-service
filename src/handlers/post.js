module.exports.post = (req, res) => {
  try {
    // validation
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
