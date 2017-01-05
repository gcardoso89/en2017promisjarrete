var express = require( 'express' );
var router = express.Router();
var colors = require( '../config' ).colors;

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	res.render( 'index', { title: 'Express', color: colors[ Math.floor( Math.random() * colors.length ) + 1 ] } );
} );

module.exports = router;
