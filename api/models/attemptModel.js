const mongoose = require('mongoose')

const answerSchema = mongoose.Schema(
    {
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'questions',
            required: true
        },
        selected_option: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const attemptSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quizzes',
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        answers: [answerSchema],
        completed_at: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
)

const attemptModel = mongoose.model('attempts', attemptSchema)
module.exports = attemptModel
