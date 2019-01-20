const 
	express = require('express'),
	path = require('path'),
	app = express(),
	bodyParser = require('body-parser'),
	server = require('http').createServer(app),
	expressConfig = require('./ServerSide/config/express'),
	port =  process.env.port ||  3000;
app.use( express.static( path.join(__dirname , 'dist')) );

//set up body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
expressConfig( app );

console.log("Server listening on port : " + port);

//set up route
app.all('*', (req, res) => {
	console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
	res.status(200).sendFile(path.join(__dirname , 'dist/index.html'));	
});

server.listen( port); 