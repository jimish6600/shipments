const express = require('express');
const { viewClassrooms } = require('../controllers/teacher.controller');
const { viewTasks, submitTask, viewSubmissionStatus } = require('../controllers/student.controller');
const studentRouter = express.Router();

// Routes for student functionality
studentRouter.get('/:studentId/classrooms', viewClassrooms);
studentRouter.get('/:studentId/classrooms/:classroomId/tasks', viewTasks);
studentRouter.post('/:studentId/classrooms/:classroomId/tasks/:taskId', submitTask);
studentRouter.get('/:studentId/classrooms/:classroomId/tasks/:taskId/status', viewSubmissionStatus);

module.exports = studentRouter;
