const classroomModel = require('../models/Classroom.model');

// Create a new classroom
exports.createClassroom = async (req, res) => {

    const { classroomName } = req.body;
    const teacherId = req.params.teacherId;

    try {
        const classroom = new classroomModel({
            classroomName,
            teacher: teacherId,
        });

        await classroom.save();

        res.status(201).json({
            classroomId: classroom.id,
            classroomName: classroom.classroomName,
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

exports.viewClassrooms = async (req, res) => {
    const teacherId = req.params.teacherId;

    try {

        const classrooms = await classroomModel.find({ teacher: teacherId });
        res.json(classrooms);
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

exports.editClassroom = async (req, res) => {
    const classroomId = req.params.classroomId;
    const { classroomName } = req.body;

    try {
        let classroom = await classroomModel.findById(classroomId);

        if (!classroom) {
            throw { message: "Classroom not found", status: 404 };
        }

        classroom.classroomName = classroomName;
        await classroom.save();

        res.json({ message: 'Classroom updated successfully' });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};

// Delete a classroom
exports.deleteClassroom = async (req, res) => {
    const classroomId = req.params.classroomId;

    try {
        let classroom = await classroomModel.findById(classroomId);

        if (!classroom) {
            throw { message: "Classroom not found", status: 404 };
        }

        await classroom.remove();

        res.json({ 
            message: 'Classroom deleted successfully'
        });
    } catch (error) {
        console.log(error.message || error)
        res.status(error.status || 500).json({
            message: error.message || "Server error",
            success: false,
        });
    }
};
