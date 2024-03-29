var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );

var routes = require( './routes/index' );
var app = express();
var isDevEnv = app.get( 'env' ) === 'development';

if ( isDevEnv ) {
	require( './socialImageGenerator' );
}

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if ( isDevEnv ) {
	app.use( require( 'node-compass' )( { project: __dirname, css: 'public/css', sass: 'compass/' } ) );
}
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );

app.use( '/', routes );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( isDevEnv ) {
	app.use( function ( err, req, res, next ) {
		res.redirect( "/" );
		/*res.status( err.status || 500 );
		res.render( 'error', {
			message: err.message,
			error: err
		} );*/
	} );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
	res.redirect( "/" );
	/*res.status( err.status || 500 );
	res.render( 'error', {
		message: err.message,
		error: {}
	} );*/
} );


module.exports = app;
