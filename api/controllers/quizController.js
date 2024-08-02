const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');

exports.get_all_quizzes = async (req, res) => {
    try {
        quizzes = await Quiz.find({})
        res.send(quizzes)
    } catch (err) {
        res.send(err)
    }
}

exports.create_quiz = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }   
        const quiz = new Quiz(req.body)
        await quiz.save()
        res.send(quiz)
    } catch (err) {
        res.send(err)
    }
}

exports.delete_all_quizzes = async (req, res) => {
    try {
        await Quiz.deleteMany()
        res.send('All quizzes are deleted')
    } catch (err) {
        res.send(err)
    }
}


exports.get_all_quizzes_by_user_id = async (req, res) => {
    try {
        quizzes = await Quiz.find({ userId: req.params.userId })
        res.send(quizzes)
    } catch (err) {
        res.send(err)
    }
}

exports.get_quiz_by_id = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId)
        res.send(quiz)
    } catch (err) {
        res.send(err)
    }
}

exports.update_quiz = async (req, res) => {
    try {
        id = req.params.quizId
        updated_quiz = req.body
        await Quiz.findByIdAndUpdate(id, updated_quiz);
        res.send("Quiz successfully updated");
    } catch (err) {
        res.send(err)
    }
}

exports.delete_quiz_by_id = async (req, res) => {
    try {
        quizId = req.params.quizId;

        // Delete the quiz
        await Quiz.findByIdAndDelete(quizId);

        // Delete the associated questions
        await Question.deleteMany({ quiz_id: quizId });

        res.send('Quiz and associated questions are deleted');
    } catch (err) {
        res.status(500).send(err);
    }
};