const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
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
    },{
        timestamps: true
    }
);

const studentModel = mongoose.models.student || mongoose.model('student', studentSchema);
module.exports = studentModel;