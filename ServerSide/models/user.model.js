'use strict';
const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('lodash');

let UserSchema = new Schema({
    
    name : {
        type :String ,
        required : true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required : true

    },
    salt : {
        type :String
    },
    role : {
        type: Boolean,
		default : 0
    }
},{timestamps: true});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    console.log("[Pre Save]");

    if(!this.salt) {
        if (this.password && this.password.length >= 4) {
            this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.hashPassword(this.password);
        }
    }

    console.log(this.password);
    next();
});

UserSchema.methods.publicFilter = function() {
        var userInstance = this.toObject();

        delete userInstance.password;
        delete userInstance.salt;

        console.log("User Instance", userInstance);

        return userInstance;
    }
    /**
     * Create instance method for hashing a password
     */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'SHA1').toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema);