const express = require('express');

const jobController = require('../controllers');
const { notificationValidator, idValidator, jobTypeValidator } = require('../helpers/validators');

const jobsRouter = express.Router();

jobsRouter.get('/', jobTypeValidator, jobController.getJobs);
jobsRouter.post('/', notificationValidator, jobController.postJob);
jobsRouter.put('/:id', idValidator, notificationValidator, jobController.putJob);
jobsRouter.delete('/:id', idValidator, jobController.deleteJob);

module.exports = jobsRouter;
