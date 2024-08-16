const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type: String,
            required: true
        },
        classrooms:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'classroom' 
            }
        ]
    },
    { 
        timestamps: true
    }
);

const teacherModel = mongoose.models.teacher || mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;
