const Queue = require('bull');

const config = require('./config');

const { REDIS_URL } = config;
const queue = new Queue('notifications', REDIS_URL);

queue.on('active', (job) => console.info(`Job with id ${job.id} in queue ${queue} has just started`));
queue.on('completed', (job, result) => console.info(`Job with id ${job.id} in queue ${queue} has been completed with result ${result}`));
queue.on('paused', (job) => console.info(`Job with id ${job.id} in queue ${queue} has paused`));
queue.on('drained', (job) => console.info(`Job with id ${job.id} in queue ${queue} has drained`));

queue.on('error', (error) => console.error(`Queue ${queue} has failed. Error: ${error.message}`));
queue.on('stalled', (job) => console.error(`Job with id ${job.id} in queue ${queue} has been stalled`));
queue.on('failed', (job, error) => console.error(`Job with id ${job.id} in queue ${queue} has failed. Error: ${error.message}`));

module.exports = queue;
