import Text from "./Text";

const WORD_LIST = [
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

const TIME_BETWEEN_TEXTS = 100;
const OVERLAP_TIME_TEXTS = 16;

const DELAY_DURATION = 6000;
const FINAL_SPEED = 1000;
const DECREASE_SPEED = 1.1;

export default class WordSlider {

	constructor() {
		this._isActive = false;
		this._startTime = null;
		this._currentText = 0;
		this._currentTime = 0;
		this._currentSpeed = TIME_BETWEEN_TEXTS;
		this._startDecreasingSpeed = null;
		this._currentTimeStamp = null;

		this._textArr = WordSlider.createTextArray();
		this._button = document.getElementById( 'stop-slider' );

		this._button.addEventListener( 'click', this._stopSlider.bind( this ) );
	}

	_stopSlider( e ) {
		e.preventDefault();
		if ( !this._startDecreasingSpeed ){
			this._startDecreasingSpeed = this._currentTimeStamp;
		}
	}

	start() {
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

			if ( this._startDecreasingSpeed && timestamp - this._startDecreasingSpeed > DELAY_DURATION ){
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
}