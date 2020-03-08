/* eslint-disable consistent-return */
const { getMongoClient } = require('../db/connection');
const logger = require('../helpers/logger');

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
    logger.error(error);
  } finally {
    await client.close();
  }
};

const updateNotificationStatus = async (id, status) => {
  const client = await getMongoClient();

  try {
    const notificationsCollection = await client.db().collection('notifications');

    const update = {
      $set: {
        sent: status,
      },
    };
    const result = await notificationsCollection.updateOne({ _id: id }, update);

    return result;
  } catch (error) {
    logger.error(error);
  } finally {
    await client.close();
  }
};

module.exports = { getAllSubscribers, updateNotificationStatus };
