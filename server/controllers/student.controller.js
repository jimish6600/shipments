const classroomModel = require("../models/Classroom.model");
const studentModel = require("../models/Student.model");
const submissionModel = require("../models/Submission.model");
const taskModel = require("../models/Task.model");

// View classrooms a student is enrolled in
exports.viewClassrooms = async (req, res) => {
    const studentId = req.params.studentId;

    try {
        const student = await studentModel.findById(studentId).populate('classrooms', 'name');

        if (!student) {
            throw { message: "Student not found", status: 404 };
        }

        const classrooms = student.classrooms.map(classroom => ({
        classroomId: classroom._id,
        classroomName: classroom.name,
        }));

        res.json(classrooms);
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// View tasks assigned to a student's classroom
exports.viewTasks = async (req, res) => {
    const { studentId, classroomId } = req.params;

    try {
        const classroom = await classroomModel.findById(classroomId).populate('tasks');

        if (!classroom) {
            throw { message: "Classroom not found", status: 404 };
        return res.status(404).json({ message: 'Classroom not found' });
        }

        if (!classroom.students.includes(studentId)) {
            throw { message: "Student not enrolled in this classroom", status: 403 };
        }

        const tasks = classroom.tasks.map(task => ({
        taskId: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        }));

        res.json(tasks);
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// Submit a task
exports.submitTask = async (req, res) => {
    const { studentId, classroomId, taskId } = req.params;
    const { file } = req.body;

    try {
        const task = await taskModel.findById(taskId);

        if (!task) {
            throw { message: "Task not found", status: 404 };
        }

        if (task.classroom.toString() !== classroomId) {
            throw { message: "Task does not belong to this classroom", status: 400 };
        }

        if (new Date(task.dueDate) < new Date()) {
            throw { message: "Cannot submit a task after the due date", status: 400 };
        }

        let submission = await submissionModel.findOne({ student: studentId, task: taskId });

        if (submission) {
            submission.file = file;
            submission.submissionDate = new Date();
            await submission.save();
        } else {
        submission = new Submission({
            student: studentId,
            task: taskId,
            file,
            submissionDate: new Date(),
        });
        await submission.save();
        }

        res.json({ message: 'Task submitted successfully.' });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// View task submission status
exports.viewSubmissionStatus = async (req, res) => {
  const { studentId, taskId } = req.params;

    try {
        const submission = await submissionModel.findOne({ student: studentId, task: taskId });

        if (!submission) {
            return res.json({ status: 'pending' });
        }

        res.json({
            studentId: submission.student._id,
            taskId: submission.task._id,
            status: 'submitted',
            submissionDate: submission.submissionDate,
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};
