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

export const RESPONSIVE_WIDTH_ARRAY = [ 1980, 1080, 1024, 768, 728, 480, 380 ];
export const FONT_SIZE_LIST = [ 138, 112, 88, 88, 56, 56, 45 ];

export const WORD_DETAIL_MAP = {
	'DETTE': { type: "image", text: "de croire qu’un jour on sera sorti de la dette", contentURL: "/images/1-DETTE.gif" },
	'CIGARETTES': { type: "image", text: "de dire «allez cette fois c’est vraiment ma dernière cigarette»", contentURL: "/images/2-CIGARETTES.gif" },
	'SERRE-TETE': { type: "image", text: "de soutenir à ma mère que «oui oui c’est très 2017 les serre-tête»", contentURL: "/images/3-SERRE-TETE.gif" },
	'BILLE EN TÊTE': { type: "image", text: "quelque soit le contextes de foncer bille-en-tête", contentURL: "/images/4-BILLE EN TETE.gif" },
	'CAFET': { type: "image", text: "de reprendre (juste un peu) de frites à la cafèt", contentURL: "/images/5-CAFET.gif" },
	'BAGUETTE': { type: "image", text: "de laisser mon boss me mener à la baguette", contentURL: "/images/6-BAGUETTE.jpg" },
	'PETE': { type: "image", text: "de dire «c’est pas moi» quand je pète", contentURL: "/images/7-PETE.gif" },
	'COUETTE': { type: "image", text: "de passer mon dimanche sous la couette", contentURL: "/images/8-COUETTE.gif" },
	'RACLETTE': { type: "image", text: "de passer l’hiver entre raclettes et tartiflettes", contentURL: "/images/9-RACLETTE_TARTIFLETTE.gif" },
	'RIME EN ETTE': { type: "image", text: "de souhaiter bonne année avec une rime en «ette»", contentURL: "/images/10-RIME-EN-ETTE.gif" },
	'LUNETTES': { type: "", text: "", contentURL: "" },
	'J’ARRETE': { type: "", text: "", contentURL: "" },
	'FACETTE': { type: "", text: "", contentURL: "" },
	'INTERNET': { type: "", text: "", contentURL: "" },
	'TRINQUETTE': { type: "", text: "", contentURL: "" },
	'CACHETTE': { type: "", text: "", contentURL: "" },
	'CHANSONETTE': { type: "", text: "", contentURL: "" },
	'CHARETTE': { type: "", text: "", contentURL: "" },
	'CHEMISETTE': { type: "", text: "", contentURL: "" },
	'COURBETTE': { type: "", text: "", contentURL: "" },
	'DISQUETTE': { type: "", text: "", contentURL: "" },
	'OUBLIETTES': { type: "", text: "", contentURL: "" },
	'POMPETTE': { type: "", text: "", contentURL: "" },
	'CHAUSSETTES': { type: "video", text: "de garder «juste au cas où» mon magnétocassette", contentURL: "https://www.youtube.com/watch?v=5hb1McPIIyE" },
	'TROTINETTE': { type: "", text: "", contentURL: "" },
	'EPAULETTES': { type: "", text: "", contentURL: "" },
	'COMÈTE': { type: "", text: "", contentURL: "" },
	'PAILLETTE': { type: "", text: "", contentURL: "" },
	'FETE': { type: "", text: "", contentURL: "" }
};

export const WORD_LIST = Object.keys( WORD_DETAIL_MAP );

export const EVENTS = {
	RESOLUTION_WINNER: 'RESOLUTION_WINNER', //arg1: text {string}
	PLAY_WORD_SLIDER: 'PLAY_WORD_SLIDER'
};

