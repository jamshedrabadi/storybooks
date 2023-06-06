const constants = require('../constants/index.js');
const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: constants.STORY_TYPES.PUBLIC,
        enum: [constants.STORY_TYPES.PUBLIC, constants.STORY_TYPES.PRIVATE],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Story', StorySchema);
