const mongoose = require('mongoose')

const quizSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    },
    {
        versionKey: false
    }
)

const quizModel = mongoose.model('quizzes', quizSchema)
module.exports = quizModel
