const express = require('express');

const config = require('./config');
const jobsRouter = require('./routes/jobsRouter');
const { authMiddleware, NotFoundError, ServerError } = require('./middlewares');
const logger = require('./helpers/logger');

const app = express();
const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendStatus(200));

app.use('/jobs', authMiddleware, jobsRouter);

app.use(NotFoundError);
app.use(ServerError);

app.listen(PORT, () => {
  logger.info(`Notification service is running on ${PORT}`);
});
