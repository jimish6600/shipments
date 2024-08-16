const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        dueDate:{
            type: Date,
            required: true
        },
        classroom:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'classroom',
            required: true
        },
        submissions:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Submission'
            }
        ]
    },{
        timestamps: true
    }
);

const taskModel = mongoose.models.task || mongoose.model('task', taskSchema);
module.exports = taskModel;