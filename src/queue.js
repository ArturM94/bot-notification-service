const Queue = require('bull');

const config = require('./config');
const { getAllSubscribers, updateNotificationStatus } = require('./db/requests');
const { sendMessage, sendPhoto, sendSticker } = require('./helpers/telegram');

const { REDIS_URL } = config;
const queue = new Queue('notifications', REDIS_URL);


queue.on('active', (job) => console.info(`Job with id ${job.id} in queue "${queue.name}" has just started`));
queue.on('completed', (job, result) => console.info(`Job with id ${job.id} in queue "${queue.name}" has been completed with result ${result}`));
queue.on('paused', (job) => console.info(`Job with id ${job.id} in queue "${queue.name}" has paused`));
queue.on('drained', () => console.info(`Queue "${queue.name}" has drained`));

queue.on('error', (error) => console.error(`Queue "${queue.name}" has failed. Error: ${error.message}`));
queue.on('stalled', (job) => console.error(`Job with id ${job.id} in queue "${queue.name}" has been stalled`));
queue.on('failed', (job, error) => console.error(`Job with id ${job.id} in queue "${queue.name}" has failed. Error: ${error.message}`));

queue.process(async (job) => {
  try {
    const { data } = job;
    const subscribers = await getAllSubscribers();

    if (data.image) {
      subscribers.map((subscriber) => sendPhoto(subscriber.chatId, data.text, data.image));
    } else if (data.sticker) {
      subscribers.map((subscriber) => sendSticker(subscriber.chatId, subscriber.sticker));
    } else {
      subscribers.map((subscriber) => sendMessage(subscriber.chatId, data.text));
    }

    await updateNotificationStatus(data.id, true);
  } catch (error) {
    console.error(error);
  }
});

module.exports = queue;
