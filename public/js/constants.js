export const PIXEL_RATIO = (function () {
	var ctx = document.createElement( "canvas" ).getContext( "2d" ),
		dpr = window.devicePixelRatio || 1,
		bsr = ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio || 1;
	return dpr / bsr;

})();

export const CANVAS_DIMENSIONS = {
	width: 960,
	height: 540
};

export const RESPONSIVE_WIDTH_ARRAY = [ 1980, 1080, 1024, 768, 728, 480];

export const WORD_LIST = [
	'DETTE',
	'CIGARETTES',
	'SERRE-TETE',
	'BILLE EN TÊTE',
	'CAFET',
	'BAGUETTE',
	'PETE',
	'COUETTE',
	'RACLETTE',
	'RIME EN ETTE',
	'LUNETTES',
	'J’ARRETE',
	'FACETTE',
	'INTERNET',
	'TRINQUETTE',
	'CACHETTE',
	'CHANSONETTE',
	'CHARETTE',
	'CHEMISETTE',
	'COURBETTE',
	'DISQUETTE',
	'OUBLIETTES',
	'POMPETTE',
	'CHAUSSETTES',
	'TROTINETTE',
	'EPAULETTES',
	'COMÈTE',
	'PAILLETTE',
	'FETE'
];