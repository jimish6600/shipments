const classroomModel = require('../models/Classroom.model');
const studentModel = require('../models/Student.model');
const taskModel = require('../models/Task.model');

// Add a student to a classroom
exports.addStudent = async (req, res) => {
    const { studentId } = req.body;
    const classroomId = req.params.classroomId;

    try {
        let classroom = await classroomModel.findById(classroomId);
        let student = await studentModel.findById(studentId);

        if (!classroom) {
            throw { message: "Classroom not found", status: 404 };
        }

        if (!student) {
            throw { message: "Student not found", status: 404 };
        }

        if (classroom.students.includes(studentId)) {
            throw { message: "Student already in classroom", status: 400 };
        }

        classroom.students.push(studentId);
        await classroom.save();

        student.classrooms.push(classroomId);
        await student.save();

        res.json({ 
            message: 'Student added successfully.' 
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// Remove a student from a classroom
exports.removeStudent = async (req, res) => {
    const { classroomId, studentId } = req.params;

    try {
        let classroom = await classroomModel.findById(classroomId);
        let student = await Student.findById(studentId);


        if (!classroom) {
            throw { message: "Classroom not found", status: 404 };
        }

        if (!student) {
            throw { message: "Student not found", status: 404 };
        }

        if (!classroom.students.includes(studentId)) {
            throw { message: "Student not found in classroom", status: 404 };
        }

        classroom.students = classroom.students.filter(student => student.toString() !== studentId);
        await classroom.save();

        student.classrooms = student.classrooms.filter(classroom => classroom.toString() !== classroomId);
        await student.save();

        res.json({
            message: 'Student removed successfully.' 
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// Assign a task to a classroom
exports.assignTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    const classroomId = req.params.classroomId;

    try {
        const task = new taskModel({
        title,
        description,
        dueDate,
        classroom: classroomId,
        });

        await task.save();

        let classroom = await classroomModel.findById(classroomId);
        classroom.tasks.push(task._id);
        await classroom.save();

        res.status(201).json({
            taskId: task.id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// View task submissions for a specific task in a classroom
exports.viewTaskSubmissions = async (req, res) => {
    const { classroomId, taskId } = req.params;

    try {
        const task = await taskModel.findById(taskId).populate('submissions.student');

        if (!task) {
            throw { message: "Task not found", status: 404 };
        }

        if (task.classroom.toString() !== classroomId) {
            throw { message: "Task does not belong to this classroom", status: 400 };
        }

        const submissions = task.submissions.map(submission => ({
            studentId: submission.student._id,
            studentName: submission.student.name,
            status: submission.status,
        }));

        res.json(submissions);
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};
