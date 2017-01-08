var express = require( 'express' );
var router = express.Router();
var config = require( '../config' );

function generateNewColor() {
	var color = config.colorList[ Math.floor( Math.random() * ( config.colorList.length - 1 ) ) ];
	var colorName = config.colorMap[ color ];
	return colorName;
}

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	res.render( 'index', { classColorName: 'color-' + generateNewColor(), layout: null } );
} );

router.get( '/:phrase', function ( req, res, next ) {
	var phrase = encodeURIComponent( req.params.phrase );
 	res.render( 'index', { classColorName: 'color-' + generateNewColor(), layout: null, phrase: phrase } );
} );

module.exports = router;
