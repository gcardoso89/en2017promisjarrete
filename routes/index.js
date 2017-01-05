var express = require( 'express' );
var router = express.Router();
var colors = require( '../config' ).colors;

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	var randomIndex = Math.floor( Math.random() * colors.length ) + 1;
	res.render( 'index', { title: 'Express', color: colors[ randomIndex ] } );
} );

module.exports = router;
