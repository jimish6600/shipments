const express = require('express');
const { createClassroom, viewClassrooms, editClassroom, deleteClassroom } = require('../controllers/teacher.controller');
const teacherRouter = express.Router();

teacherRouter.post('/:teacherId/classrooms', createClassroom);
teacherRouter.get('/:teacherId/classrooms', viewClassrooms);
teacherRouter.put('/classrooms/:classroomId', editClassroom);
teacherRouter.delete('/classrooms/:classroomId', deleteClassroom);

module.exports = teacherRouter;
