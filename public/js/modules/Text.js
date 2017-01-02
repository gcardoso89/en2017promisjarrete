import Property from "./Property";
import { PIXEL_RATIO, CANVAS_DIMENSIONS } from "../constants";

const POSITION = {
	x: 0,
	y: 0
};

const DEFAULT_OPTIONS = {
	animDuration: 1000
};

export default class Text {

	constructor( text, options ) {
		this._startTime = null;
		this._currentTime = null;

		this._text = text;
		this._options = { ...DEFAULT_OPTIONS, ...options };
		this._canvas = document.createElement( 'canvas' );
		this._canvas.width = CANVAS_DIMENSIONS.width * PIXEL_RATIO;
		this._canvas.height = CANVAS_DIMENSIONS.height * PIXEL_RATIO;
		this._ctx = this._canvas.getContext( '2d' );
		this._ctx.font = "40px/1.0 ArialBlack";
		this._ctx.lineJoin = 'miter';
		this._ctx.miterLimit = 10;
		this._ctx.textAlign = 'center';
		this._ctx.textBaseline = 'alphabetic';

		this._textWidth = CANVAS_DIMENSIONS.width;

		this._isActive = false;
		this._opacity = new Property( { reverseLoop: true, loop: true, duration: this._options.animDuration / 2 } );
		this._scale = new Property( { start: 0, duration: this._options.animDuration } );
	}

	start() {
		this._isActive = true;
		this._opacity.start();
		this._scale.start();
		this._startTime = null;
	}

	update( timeDelta, timestamp ) {
		if ( this._isActive ) {
			this._startTime = this._startTime || timestamp;
			this._currentTime += timeDelta;
			if ( this._currentTime > this._options.animDuration ) {
				this._isActive = false;
				this._currentTime = 0;
			}
			this._opacity.update( timeDelta, timestamp );
			this._scale.update( timeDelta, timestamp );
		}

	}

	draw( ctx ) {
		if ( this._isActive ) {
			let scale = this._scale.getCurrentValue();

			this._ctx.save();
			this._ctx.clearRect( 0, 0, this._canvas.width, this._canvas.height );
			this._ctx.translate( this._textWidth, 80 );
			this._ctx.scale( PIXEL_RATIO * scale , PIXEL_RATIO * scale );
			this._ctx.translate( 0, 12 );
			this._ctx.globalAlpha = this._opacity.getCurrentValue();
			this._ctx.fillText( this._text, 0, 0, this._textWidth );
			this._ctx.restore();
			ctx.drawImage( this._canvas, 0, 0, this._canvas.width, this._canvas.height );
		}
	}
}