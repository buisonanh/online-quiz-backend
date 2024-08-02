const mongoose = require('mongoose')

const optionSchema = mongoose.Schema(
    {
        option_text: {
            type: String,
            required: true
        },
        is_correct: {
            type: Boolean,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const questionSchema = mongoose.Schema(
    {
        quiz_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quizzes',
            required: true
        },
        question_text: {
            type: String,
            required: true
        },
        options: [optionSchema]
    },
    {
        versionKey: false
    }
)

const questionModel = mongoose.model('questions', questionSchema)
module.exports = questionModel
