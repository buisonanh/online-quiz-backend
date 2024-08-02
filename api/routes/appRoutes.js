const userController = require('../controllers/userController');
const quizController = require('../controllers/quizController');
const questionController = require('../controllers/questionController');
const attemptController = require('../controllers/attemptController');

const appRoutes = (app) => {
    // Users
    app.route('/users')
        .get(userController.get_all_users)
        .post(userController.create_user)
        .delete(userController.delete_all_users)

    app.route('/users/:userId')
        .get(userController.get_user_by_id)
        .delete(userController.delete_user_by_id)
        .put(userController.update_user)

    app.route('/register').post(userController.register_user)
    app.route('/login').post(userController.login_user)

    // Quizzes
    app.route('/quizzes')
        .get(quizController.get_all_quizzes)
        .post(userController.protect,quizController.create_quiz)
        .delete(userController.protect, quizController.delete_all_quizzes)
    
    app.route('/quizzes/:userId')
        .get(quizController.get_all_quizzes_by_user_id)

    app.route('/quizzes/quiz/:quizId')
        .get(quizController.get_quiz_by_id)
        .put(userController.protect, quizController.update_quiz)
        .delete(userController.protect, quizController.delete_quiz_by_id)

    // Questions
    app.route('/questions/:quizId')
        .get(questionController.get_all_questions_by_quiz_id)
        .post(userController.protect, questionController.create_question)
        .delete(userController.protect, questionController.delete_all_questions_by_quiz_id);
    
    app.route('/questions/question/:questionId')
        .get(questionController.get_question_by_id)
        .put(userController.protect, questionController.update_question)
        .delete(userController.protect, questionController.delete_question_by_id);

    // Attempts
    app.route('/attempts')
        .post(attemptController.create_attempt);
    
    app.route('/attempts/:attemptId')
        .get(attemptController.get_attempt_by_id)
        .delete(attemptController.delete_attempt_by_id);
    
    app.route('/attempts/user/:userId')
        .get(attemptController.get_attempts_by_user_id);
    
    app.route('/attempts/quiz/:quizId')
        .get(attemptController.get_attempts_by_quiz_id);
};
module.exports = appRoutes;
