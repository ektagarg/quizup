const
	jwt = require('jsonwebtoken'),
	authConfig = require('../config/auth');

module.exports = function(req, res, next ) {

var token = req.body.token || req.query.token || req.headers['x-access-token'];

// decode token
if (token) {
	
	// verifies secret and checks exp
	jwt.verify(token, authConfig.secret, function(err, decoded) {
		
		console.log("decoded: " , decoded);
		if (err) {
			return res.status(401).json({ success: false, message: err });
		}

		else {
			// if everything is good, save to request for use in other routes
			req.user = decoded;
			next();
		}
	});
} else {
	// if there is no token
	// return an error
	return res.status(401).send({
		success: false,
		message: 'No token provided.'
	});
}
}