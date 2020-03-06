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

const updateNotificationStatus = async (id, status) => {
  const client = await getMongoClient();

  try {
    const notificationsCollection = await client.db().collection('notifications');

    const update = {
      $set: {
        sent: status,
      },
    };
    const result = await notificationsCollection.update({ _id: id }, update);

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

module.exports = { getAllSubscribers, updateNotificationStatus };
