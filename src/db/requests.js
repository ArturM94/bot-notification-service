/* eslint-disable consistent-return */
const { getMongoClient } = require('../db/connection');

const getAllSubscribers = async () => {
  const client = await getMongoClient();

  try {
    const usersCollection = await client.db().collection('users');

    const options = {
      projection: {
        chatId: 1,
        _id: 0,
      },
    };
    const usersIds = await usersCollection.find({}, options).toArray();

    return usersIds;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

module.exports = { getAllSubscribers };
