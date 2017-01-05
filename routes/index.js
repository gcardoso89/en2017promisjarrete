var express = require( 'express' );
var router = express.Router();
var config = require( '../config' );

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	var color = config.colorList[ Math.floor( Math.random() * ( config.colorList.length - 1 ) ) ];
	var colorName = config.colorMap[ color ];
	res.render( 'index', { title: 'Express', classColorName: 'color-' + colorName } );
} );

module.exports = router;
