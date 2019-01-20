'use strict';
const
    mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let QuizSchema = new Schema({
	question : {
		type : String ,
		required : true
	},
	options : {
		type : [String],
		default : null,
		validate: [arrayLimit, 'Provide two to four options.']
    },
    answer : {
		type : String,
		required : true
	},
	created_by : {
		type : Schema.Types.ObjectId,
		ref:'User'
	}
},{timestamps: true});

function arrayLimit(val) {
	return  val.length >= 2 && val.length <= 4;
}

module.exports =  mongoose.model( 'quiz' , QuizSchema);