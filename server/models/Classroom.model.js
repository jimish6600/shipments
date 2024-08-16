const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema(
    {
        classroomName:{ 
            type: String, 
            required: true 
        },
        teacher:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'teacher',
            required: true
        },
        students:[
            { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'student' 
            }
        ],
        tasks:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'task'
            }
        ]
    },{
        timestamps: true
    }
);

const classroomModel = mongoose.models.classroom || mongoose.model('classroom', classroomSchema);
module.exports = classroomModel;
