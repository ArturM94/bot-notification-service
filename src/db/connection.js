const { MongoClient } = require('mongodb');

const config = require('../config');

const { DB_URL } = config;

const getMongoClient = () => {
  const client = new MongoClient(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  return client.connect();
};

module.exports = { getMongoClient };
