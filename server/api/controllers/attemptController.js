const Attempt = require('../models/attemptModel');
const Question = require('../models/questionModel');

exports.get_all_attempts = async (req, res) => {
    try {
        const attempts = await Attempt.find({});
        res.send(attempts);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.create_attempt = async (req, res) => {
    try {
        const { user_id, quiz_id, answers } = req.body;

        // Calculate score
        let score = 0;
        const questions = await Question.find({ quiz_id });

        for (const answer of answers) {
            const question = questions.find(q => q._id.toString() === answer.question_id);
            if (question) {
                const correctOption = question.options.find(option => option.is_correct);
                if (correctOption && correctOption.option_text === answer.selected_option) {
                    score++;
                }
            }
        }

        // Calculate percentage score
        const scorePercentage = (score / questions.length) * 100;

        const attempt = new Attempt({
            user_id,
            quiz_id,
            score: scorePercentage,
            answers
        });

        await attempt.save();
        res.status(201).send(attempt);
    } catch (err) {
        console.error('Error creating attempt:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


exports.get_attempt_by_id = async (req, res) => {
    try {
        const attempt = await Attempt.findById(req.params.attemptId);
        res.send(attempt);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.delete_attempt_by_id = async (req, res) => {
    try {
        await Attempt.findByIdAndDelete(req.params.attemptId);
        res.send('Attempt is deleted');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.get_attempts_by_user_id = async (req, res) => {
    try {
        const attempts = await Attempt.find({ user_id: req.params.userId });
        res.send(attempts);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.get_attempts_by_quiz_id = async (req, res) => {
    try {
        const attempts = await Attempt.find({ quiz_id: req.params.quizId });
        res.send(attempts);
    } catch (err) {
        res.status(500).send(err);
    }
};
