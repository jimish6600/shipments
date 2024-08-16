const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
    {
        student:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
            required: true
        },
        task:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task',
            required: true
        },
        status:{
            type: String,
            enum: ['submitted','pending'],
            default: 'pending'
        },
        documentUrl:{
            type: String,
            required: true
        },
        submittedAt:{
            type: Date,
            default: Date.now
        }
    },{
        timestamps: true
    }
);

const submissionModel = mongoose.models.submission || mongoose.model('submission', submissionSchema);
module.exports = submissionModel;