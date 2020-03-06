const express = require('express');

const jobController = require('../controllers');
const {
  notificationIdValidator,
  notificationValidator,
  idValidator,
  jobTypeValidator,
} = require('../helpers/validators');

const jobsRouter = express.Router();

jobsRouter.get('/', jobTypeValidator, jobController.getJobs);
jobsRouter.get('/:id', idValidator, jobController.getJobById);
jobsRouter.post('/', notificationIdValidator, notificationValidator, jobController.addJob);
jobsRouter.put('/:id', idValidator, notificationValidator, jobController.updateJob);
jobsRouter.delete('/:id', idValidator, jobController.deleteJob);

module.exports = jobsRouter;
