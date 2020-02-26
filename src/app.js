const express = require('express');

const config = require('./config');
const postJob = require('./handlers/postJob');
const putJob = require('./handlers/putJob');
const deleteJob = require('./handlers/deleteJob');
const getJobs = require('./handlers/getJobs');
const { notificationValidator, idValidator, jobTypeValidator } = require('./validators');

const app = express();
const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendStatus(200));

app.get('/jobs', jobTypeValidator, getJobs);
app.post('/jobs', notificationValidator, postJob);
app.put('/jobs/:id', idValidator, notificationValidator, putJob);
app.delete('/jobs/:id', idValidator, deleteJob);

app.listen(PORT, () => {
  console.log(`Notification service is running on ${PORT}`);
});
