"use strict";
const
    express = require('express'),
    router = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    QuizController = require('../controllers/quiz.controller');

    router.get('/', QuizController.getQuiz);
    router.post('/', QuizController.createQuiz);
    router.post('/answerQuiz', QuizController.answerQuiz);

module.exports = function(app) {
    app.use('/api/quiz', isAuthenticated, router);
}