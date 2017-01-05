import Text from "./Text";
import { RESPONSIVE_WIDTH_ARRAY, WORD_LIST } from "../constants";

const TIME_BETWEEN_TEXTS = 100;
const OVERLAP_TIME_TEXTS = 20;

const DELAY_DURATION = 6000;
const FINAL_SPEED = 1000;
const DECREASE_SPEED = 1.1;
const FONT_SIZE_LIST = [ 138, 112, 88, 88, 56, 56 ];

const FONT_SiZE_MAP = (function ( fontSizeList ) {
	let map = {};

	for ( let i = 0; i < RESPONSIVE_WIDTH_ARRAY.length; i++ ) {
		let width = RESPONSIVE_WIDTH_ARRAY[ i ];
		map[ width ] = fontSizeList[ i ];
	}

	return map;
})( FONT_SIZE_LIST );

export default class WordSlider {

	constructor() {
		this._isActive = false;
		this._startTime = null;
		this._currentText = 0;
		this._currentTime = 0;
		this._currentSpeed = TIME_BETWEEN_TEXTS;
		this._startDecreasingSpeed = null;
		this._currentTimeStamp = null;
		this._currentFontSize = FONT_SIZE_LIST[ 0 ];
		this._textArr = WordSlider.createTextArray();
		this._button = document.getElementById( 'stop-slider' );
		this._win = window;

		this._resizeHandlerTimeout = null;

		this._button.addEventListener( 'click', this._stopSlider.bind( this ) );
		this._win.addEventListener( 'resize', () => {
			if ( this._resizeHandlerTimeout ) {
				clearTimeout( this._resizeHandlerTimeout );
				this._resizeHandlerTimeout = null;
			}
			this._resizeHandlerTimeout = setTimeout( this._handleResize.bind( this ), 500 );
		} );
	}

	_stopSlider( e ) {
		e.preventDefault();
		if ( !this._startDecreasingSpeed ) {
			this._startDecreasingSpeed = this._currentTimeStamp;
		}
	}

	_handleResize() {
		let newFontSize;
		this._currentWidth = this._win.innerWidth;
		if ( this._currentWidth >= RESPONSIVE_WIDTH_ARRAY[ 0 ] ) {
			newFontSize = RESPONSIVE_WIDTH_ARRAY[ 0 ];
		} else {
			for ( let i = 0; i < RESPONSIVE_WIDTH_ARRAY.length; i++ ) {
				if ( this._currentWidth < RESPONSIVE_WIDTH_ARRAY[ i ] ) {
					let indNormalized = ( ( i + 1 ) === RESPONSIVE_WIDTH_ARRAY.length ) ? i : ( i + 1 );
					newFontSize = FONT_SiZE_MAP[ RESPONSIVE_WIDTH_ARRAY[ indNormalized ] ];
				}
			}
		}

		if ( newFontSize !== this._currentFontSize ) {
			this._currentFontSize = newFontSize;
			this.changeFontSize();
		}

	}

	start() {
		this._handleResize();
		this._isActive = true;
		this._startTime = Date.now();
		this._currentText = 0;
		this._currentTime = 0;
		this._currentSpeed = TIME_BETWEEN_TEXTS;
		for ( let i = 0; i < this._textArr.length; i++ ) {
			this._textArr[ i ].setDuration( this._currentSpeed + OVERLAP_TIME_TEXTS );
		}
		this._textArr[ this._currentText ].start();
	}

	update( timeDelta, timestamp ) {
		if ( this._isActive ) {
			if ( this._currentTime >= this._currentSpeed ) {
				this._currentTime = 0;
				this._currentText = ( this._currentText + 1 === WORD_LIST.length ? 0 : this._currentText + 1 );
				this._textArr[ this._currentText ].start();
			}

			this._currentTime += timeDelta;

			if ( this._startDecreasingSpeed ) {
				this._currentSpeed = this._currentSpeed >= FINAL_SPEED ? FINAL_SPEED : this._currentSpeed + DECREASE_SPEED;
			}

			for ( let i = 0; i < this._textArr.length; i++ ) {
				let text = this._textArr[ i ];
				if ( this._startDecreasingSpeed ) {
					text.setDuration( this._currentSpeed + OVERLAP_TIME_TEXTS );
				}
				text.update( timeDelta, timestamp );
			}

			if ( this._startDecreasingSpeed && timestamp - this._startDecreasingSpeed > DELAY_DURATION ) {
				this._startDecreasingSpeed = false;
				this._isActive = false;
				alert( this._textArr[ this._currentText ]._text );
				this.start();
			}

		}
		this._currentTimeStamp = timestamp;
	}

	draw( ctx ) {
		for ( let i = 0; i < this._textArr.length; i++ ) {
			this._textArr[ i ].draw( ctx );
		}
	}

	static createTextArray() {
		let arr = [];
		for ( let i = 0; i < WORD_LIST.length; i++ ) {
			arr.push( new Text( WORD_LIST[ i ], { animDuration: TIME_BETWEEN_TEXTS + OVERLAP_TIME_TEXTS } ) );
		}
		return arr;
	}

	changeFontSize() {
		for ( let i = 0; i < this._textArr.length; i++ ) {
			this._textArr[ i ].setFontSize( this._currentFontSize );
		}
	}
}