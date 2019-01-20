"use strict";

const
    authConfig = require('../config/auth'),
    jwt = require('jsonwebtoken');

let SignToken = (payload, options) => {
    if (!options) options = {};
    let token = jwt.sign(payload, authConfig.secret, options);
    console.log(token);
    return token;
}

module.exports = {
    signToken: SignToken
};