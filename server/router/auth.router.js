const express = require('express');
const { registerTeacher, loginTeacher, registerStudent, loginStudent } = require('../controllers/auth.controller');
const authRouter = express.Router();

//student 
authRouter.post('/student/register', registerStudent);
authRouter.post('/student/login', loginStudent);

// teacher
authRouter.post('/teacher/register', registerTeacher);
authRouter.post('/teacher/login', loginTeacher);

module.exports = authRouter;
