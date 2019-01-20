const 
    Quiz = require('../models/quiz.model'),
    Score = require('../models/score.model'),
    User = require('../models/user.model'),
    Operators = require ('../utilities/operator'),
    mongo = require('mongodb'),
    _ = require('lodash');
    
/**
 * create - create quiz 
 * POST method
 */
let CreateQuiz = async (req , res ) => {
    //only admin can create the quiz
    let userId = new mongo.ObjectID(req.user.user_id);
    let user = await User.findOne({_id:userId});
    if(user.role == false)
        return res.status(400).json({message: "Only admin can create the quiz."});
        
    let quizData = req.body;
    
    let quiz = new Quiz(quizData);
    
	Quiz.create( quiz , (err , response ) => {
        if ( err )
            return  res.status(500).json( {err : err} );
        return res.status(201).json( response );
	});
}

/**
 * get - get all quizzes
 * GET method
 */

let GetQuiz = (req, res) => {
    Quiz.find({}, function(err, quizzes) {
        if (err) 
			return  res.status(500).json( {err : err} );
		return res.status(200).json(quizzes);
    });
}

//answer a quiz
let AnswerQuiz =  async (req,res) => {
    let userId = req.user.user_id;
    let answeredQuiz = req.body;
    let scored = 0;
    let id = new mongo.ObjectID(answeredQuiz.id);

    //find the quiz
    let quiz = await Quiz.findOne({ _id: id });
    if (!quiz) 
        return res.status(404).json({message : "Quiz not found"});
    
    // check if your has already answered the quiz
    let score = await Score.find({user: userId});
    let found = _.find(score[0].questions, function(o) { return o.includes(answeredQuiz.id)});
    if(found)
        return res.status(400).json({message : "You already answered this quiz"});
    
    //compare answer with the quiz answer
    if(answeredQuiz.answer == quiz.answer)
        scored =+ 10;
    else
        scored =- 5;

    Score.find({user: userId}, (err, score) => {
        if(!err){
            if(score.length == 0){
                //create the score
                let scoreToAdd = new Score({user:userId, questions:answeredQuiz.id, score:scored});
                Score.create( scoreToAdd , (err , response ) => {
                    if ( err )
                        return  res.status(500).json( {err : err} );
                    return res.status(201).json( response );
                });
            }else{
                //update the score
               console.log(score[0].score);
                Score.updateOne({user: userId},{$push: { questions: answeredQuiz.id } , score:score[0].score + scored}, (err, response) => {
                    if ( err )
                        return  res.status(500).json( {err : err} );
                    return res.status(201).json( response );
                })

            }
        }
    })
}
module.exports = {
    createQuiz: CreateQuiz,
    getQuiz: GetQuiz,
    answerQuiz: AnswerQuiz
}