const express = require('express');
const { addStudent, removeStudent, assignTask, viewTaskSubmissions } = require('../controllers/classroom.controller');
const classroomRrouter = express.Router();

// Routes for classroom functionality
classroomRrouter.post('/:classroomId/students', addStudent);
classroomRrouter.delete('/:classroomId/students/:studentId', removeStudent);
classroomRrouter.post('/:classroomId/tasks', assignTask);
classroomRrouter.get('/:classroomId/tasks/:taskId/submissions', viewTaskSubmissions);

module.exports = classroomRrouter;
