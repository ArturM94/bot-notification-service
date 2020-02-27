const express = require('express');

const config = require('./config');
const postJob = require('./controllers/postJob');
const putJob = require('./controllers/putJob');
const deleteJob = require('./controllers/deleteJob');
const getJobs = require('./controllers/getJobs');
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
