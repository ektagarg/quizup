let GetQueryParams = ( req , key ) => {
	
	return req.query[key] || req.params[key] ;
}

module.exports = {
	getQueryParams : GetQueryParams
}