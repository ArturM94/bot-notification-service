const Queue = require('bull');

const config = require('./config');
const logger = require('./helpers/logger');
const { getAllSubscribers, updateNotificationStatus } = require('./db/requests');
const { sendMessage, sendPhoto, sendSticker } = require('./helpers/telegram');

const { REDIS_URL } = config;
const queue = new Queue('notifications', REDIS_URL);


queue.on('active', (job) => logger.info(`Job with id ${job.id} in queue "${queue.name}" has just started`));
queue.on('completed', (job, result) => logger.info(`Job with id ${job.id} in queue "${queue.name}" has been completed with result ${result}`));
queue.on('paused', (job) => logger.info(`Job with id ${job.id} in queue "${queue.name}" has paused`));
queue.on('drained', () => logger.info(`Queue "${queue.name}" has drained`));

queue.on('error', (error) => logger.error(`Queue "${queue.name}" has failed. Error: ${error.message}`));
queue.on('stalled', (job) => logger.error(`Job with id ${job.id} in queue "${queue.name}" has been stalled`));
queue.on('failed', (job, error) => logger.error(`Job with id ${job.id} in queue "${queue.name}" has failed. Error: ${error.message}`));

queue.process(async (job) => {
  try {
    const { data } = job;
    const subscribers = await getAllSubscribers();

    if (data.image && data.sticker) {
      subscribers.map((subscriber) => sendPhoto(subscriber.chatId, data.text, data.image));
      subscribers.map((subscriber) => sendSticker(subscriber.chatId, data.sticker));
    } else if (data.image) {
      subscribers.map((subscriber) => sendPhoto(subscriber.chatId, data.text, data.image));
    } else if (data.text && data.sticker) {
      subscribers.map((subscriber) => sendMessage(subscriber.chatId, data.text));
      subscribers.map((subscriber) => sendSticker(subscriber.chatId, data.sticker));
    } else if (data.text) {
      subscribers.map((subscriber) => sendMessage(subscriber.chatId, data.text));
    }

    await updateNotificationStatus(data.id, true);
  } catch (error) {
    logger.error(error);
  }
});

module.exports = queue;
