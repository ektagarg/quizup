
const
path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
database = require('./db'),
env = process.env.NODE_ENV || 'development',
_ = require('lodash');

var config = {
development: {
    root: rootPath,
    app: {
        name: 'quizup'
    },
    db: database.development,
    port: process.env.PORT || 8080
},

test: {
    root: rootPath,
    app: {
        name: 'quizup'
    },
    port: process.env.PORT || 8080,
    db: database.test
},

production: {
    root: rootPath,
    app: {
        name: 'quizup'
    },
    port: process.env.PORT || 8080
}
};

module.exports = config[env];