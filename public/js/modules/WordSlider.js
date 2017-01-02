import Text from "./Text";

const WORD_LIST = [
	'Ricardo',
	'Lorem',
	'Junior',
	'Gordinho',
	'Gonçalo',
	'Amilcar',
	'Branquinha',
	'Ivone',
	'Igor'
];

const TIME_BETWEEN_TEXTS = 500;
const OVERLAP_TIME_TEXTS = 300;

export default class WordSlider {

	constructor() {
		this._isActive = false;
		this._startTime = null;
		this._currentText = 0;
		this._currentTime = 0;
		this._textArr = WordSlider.createTextArray();
	}

	start(){
		this._isActive = true;
		this._startTime = Date.now();
		this._currentText = 0;
		this._currentTime = 0;
		this._textArr[ this._currentText ].start();
	}

	update( timeDelta, timestamp ) {
		if ( this._isActive ){
			if ( this._currentTime >= TIME_BETWEEN_TEXTS ){
				this._currentTime = 0;
				this._currentText = ( this._currentText + 1 === WORD_LIST.length ? 0 : this._currentText + 1 );
				this._textArr[ this._currentText ].start();
			}
			this._currentTime += timeDelta;
			for ( let i = 0; i < this._textArr.length; i++ ) {
				this._textArr[ i ].update( timeDelta, timestamp );
			}
		}
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
}