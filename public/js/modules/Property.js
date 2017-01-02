const DEFAULT_OPTIONS = {
	start: 0,
	end: 1,
	duration: 1000,
	direction: 1,
	loop: false,
	reverseLoop: false
};

export default class Property {

	constructor( options ) {
		this._animOptions = { ...DEFAULT_OPTIONS, ...options };
		this._elapsed = 0;
		this._currentDirection = this._animOptions.direction;
		this._currentValue = this._animOptions.start;
	}

	update( timeDelta ) {
		if ( this._isActive ) {
			this._tick( timeDelta );
		}
	}

	start() {
		this._isActive = true;
		this._elapsed = 0;
		this._currentValue = this._animOptions.start;
		this._currentDirection = this._animOptions.direction;
	}

	getCurrentValue() {
		return this._currentValue;
	}

	_tick( timeDelta ) {
		let options = this._animOptions;

		let value;
		let { start, end, duration, loop, reverseLoop } = options;

		this._elapsed += timeDelta;
		value = ( end - start ) * ( this._elapsed / duration );

		if ( this._currentDirection < 1 ) {
			value = end - value;
			value = ( value <= start ? start : value );
		} else {
			value = start + value;
			value = ( value >= end ? end : value );
		}

		if ( value === end || ( this._currentDirection < 1 && value === start ) ) {
			if ( loop ) {
				if ( reverseLoop ) {
					this._currentDirection *= -1;
				}
			} else {
				this._isActive = false;
			}
			this._elapsed = 0;
		}

		this._currentValue = value;
	}

}