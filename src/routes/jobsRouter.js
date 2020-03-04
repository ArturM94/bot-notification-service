const express = require('express');

const jobController = require('../controllers');
const {
  queueValidator,
  notificationValidator,
  idValidator,
  jobTypeValidator,
} = require('../helpers/validators');

const jobsRouter = express.Router();

jobsRouter.get('/', queueValidator, jobTypeValidator, jobController.getJobs);
jobsRouter.post('/', queueValidator, notificationValidator, jobController.addJob);
jobsRouter.put('/:id', idValidator, queueValidator, notificationValidator, jobController.updateJob);
jobsRouter.delete('/:id', idValidator, queueValidator, jobController.deleteJob);

module.exports = jobsRouter;
