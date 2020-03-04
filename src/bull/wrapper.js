const QueuesHandler = require('./queues');
const { BULL_METHODS } = require('../constants');
const { getAllSubscribers, updateNotificationStatus } = require('../db/requests');
const { sendMessage, sendPhoto } = require('../helpers/telegram');

const AVAILABLE_QUEUES = Object.keys(QueuesHandler);
const AVAILABLE_METHODS = Object.values(BULL_METHODS);

AVAILABLE_QUEUES.forEach((queue) => {
  QueuesHandler[queue].on('active', (job) => console.info(`Job with id ${job.id} in queue "${queue}" has just started`));
  QueuesHandler[queue].on('completed', (job, result) => console.info(`Job with id ${job.id} in queue "${queue}" has been completed with result ${result}`));
  QueuesHandler[queue].on('paused', (job) => console.info(`Job with id ${job.id} in queue "${queue}" has paused`));
  QueuesHandler[queue].on('drained', () => console.info(`Queue "${queue}" has drained`));

  QueuesHandler[queue].on('error', (error) => console.error(`Queue "${queue}" has failed. Error: ${error.message}`));
  QueuesHandler[queue].on('stalled', (job) => console.error(`Job with id ${job.id} in queue "${queue}" has been stalled`));
  QueuesHandler[queue].on('failed', (job, error) => console.error(`Job with id ${job.id} in queue "${queue}" has failed. Error: ${error.message}`));

  QueuesHandler[queue].process(async (job) => {
    try {
      const { data } = job;
      const subscribers = await getAllSubscribers();

      if (data.attachments) {
        subscribers.map((subscriber) => sendPhoto(subscriber.chatId, data.text, data.attachments));
      } else {
        subscribers.map((subscriber) => sendMessage(subscriber.chatId, data.text));
      }

      await updateNotificationStatus(data.id, true);
    } catch (error) {
      console.error(error);
    }
  });
});

/**
 * Wrapper for multiply Bull queues
 *
 * @param {string} queue - name of a queue
 * @param {string} method - name of a queue's method
 * @param data - payload for queue's method
 * @param opts - options for queue's method
 * @return {Promise<Job | Job[] | void>} - call result of queue's method
 */
const bullWrapper = async (queue, method, data, opts) => {
  if (!AVAILABLE_QUEUES.includes(queue) || !AVAILABLE_METHODS.includes(method)) {
    throw new Error('Passed queue name or method not exist');
  }

  return QueuesHandler[queue][method](data, opts);
};

module.exports = bullWrapper;
