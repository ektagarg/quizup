'use strict';
const
    mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let ScoreSchema = new Schema({
	user : {
		type : Schema.Types.ObjectId,
		ref:'User'
	},
	score : {
		type : Number,
		required : true
	},
	questions : {
		type : [String],
		default : null
    }
},{timestamps: true});

module.exports =  mongoose.model( 'score' , ScoreSchema);