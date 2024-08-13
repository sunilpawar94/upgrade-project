const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    influencersApplied: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open',
    },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
