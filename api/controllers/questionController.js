const Question = require('../models/questionModel');

exports.get_all_questions_by_quiz_id = async (req, res) => {
    try {
        questions = await Question.find({ quiz_id: req.params.quizId })
        res.send(questions)
    } catch (err) {
        res.send(err)
    }
}

exports.create_question = async (req, res) => {
    try {
        const question = new Question(req.body)
        await question.save()
        res.send(question)
    } catch (err) {
        res.send(err)
    }
}

exports.delete_all_questions_by_quiz_id = async (req, res) => {
    try {
        await Question.deleteMany({ quiz_id: req.params.quizId })
        res.send('All questions are deleted')
    } catch (err) {
        res.send(err)
    }
}

exports.get_question_by_id = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId)
        res.send(question)
    } catch (err) {
        res.send(err)
    }
}

exports.update_question = async (req, res) => {
    try {
        id = req.params.questionId
        updated_question = req.body
        await Question.findByIdAndUpdate(id, updated_question)
        res.send("Question successfully updated")
    } catch(err) {
        res.send(err)
    }
}

exports.delete_question_by_id = async (req, res) => {
    try {
        id = req.params.questionId
        await Question.findByIdAndDelete(id)
        res.send("Question successfully deleted")
    } catch (err) {
        res.send(err)
    }
}