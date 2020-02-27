const express = require('express');

const config = require('./config');
const jobsRouter = require('./routes/jobsRouter');

const app = express();
const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendStatus(200));

app.use('/jobs', jobsRouter);

app.listen(PORT, () => {
  console.log(`Notification service is running on ${PORT}`);
});
