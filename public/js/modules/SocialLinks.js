import { EVENTS } from "../constants";
import globalEmitter from "./Emitter";

export default class SocialLinks {

	constructor() {
		this._shareUrl = null;
		this._baseUrl = `${location.protocol}//${location.host}/`;
		this._twitter = document.getElementById( 'social-twitter' );
		this._facebook = document.getElementById( 'social-facebook' );
		this._mail = document.getElementById( 'social-mail' );

		globalEmitter.subscribe( EVENTS.SET_SOCIAL_LINKS, ( e, word ) => this._setSocialLinks( btoa( word ) ) );
	}

	_setTwitterLink( receiver ) {
		let baseUrl = 'https://twitter.com/intent/tweet';
		let shareUrl = encodeURIComponent( this._shareUrl );
		baseUrl += '?url=' + shareUrl;
		baseUrl += "&text=" + encodeURIComponent( "Voici un petit message de ma part pour " + receiver + " - " + receiver + " > " );

		this._twitter.addEventListener( 'click', (e ) => {
			e.preventDefault();
			let width = 575,
				height = 400,
				left = (window.innerWidth - width) / 2,
				top = (window.innerHeight - height) / 2,
				opts = 'status=1' +
					',width=' + width +
					',height=' + height +
					',top=' + top +
					',left=' + left;
			window.open( baseUrl, 'twitter', opts );
			return false;
		} );

	}

	_setFacebookLink() {
		this._facebook.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			FB.ui( {
				method: 'share',
				href: this._shareUrl
			} );
		} );
	}

	_setMailLink() {
		let subject = '';
		let bodyText = '';
		this._mail.setAttribute( 'href', 'mailto:?subject=' + subject + '&body=' + bodyText );
	}

	_setSocialLinks( shareId ) {
		this._shareUrl = this._baseUrl + shareId;
		this._setTwitterLink();
		this._setFacebookLink();
		this._setMailLink();
	}
}

