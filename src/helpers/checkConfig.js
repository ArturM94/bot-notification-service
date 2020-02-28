
const checkConfig = (config) => {
  const empty = Object.values(config).some((item) => item === null);
  if (empty) {
    console.error('Not all .ENV variables specified!');
    process.exit(1);
  }
};

module.exports = checkConfig;
