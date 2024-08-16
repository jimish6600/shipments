const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const teacherModel = require('../models/Teacher.model');
const studentModel = require('../models/Student.model');

// teacher
exports.registerTeacher = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        let teacher = await teacherModel.findOne({email});

        if(teacher){
            throw { message: "Teacher already exists", status: 400 };
        }

        teacher = new teacherModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(password, salt);
        await teacher.save();

        const tokenData = {
            _id: teacher._id,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);
        
        res.status(200).json({
            data: token,
            success: true,     
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

exports.loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    
        let teacher = await teacherModel.findOne({email});
        if (!teacher) {
            throw { message: "Teacher not exists", status: 400 };
        }


        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            throw { message: "Password not match", status: 400 };
        }

        const tokenData = {
            _id: teacher._id,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);
        
        res.status(200).json({
            data: token,
            success: true,     
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// student
exports.registerStudent = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        let student = await studentModel.findOne({email});

        if(student){
            throw { message: "Student already exists", status: 400 };
        }

        student = new studentModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(password, salt);
        await student.save();

        const tokenData = {
            _id: student._id,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);
        
        res.status(200).json({
            data: token,
            success: true,     
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    
        let student = await studentModel.findOne({email});
        if (!student) {
            throw { message: "Student not exists", status: 400 };
        }


        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            throw { message: "Password not match", status: 400 };
        }

        const tokenData = {
            _id: student._id,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY);
        
        res.status(200).json({
            data: token,
            success: true,     
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};