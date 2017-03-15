import Popup from './Popup';
import pano from '../lib/jquery-pano';
// let pano = require();

let imageSrc = $(".js-panorama").data('image');

let panorama = $(".js-panorama").pano({
	img: imageSrc,
	interval: 100,
	speed: 50
});

let popupPanorama = new Popup({
	popup: '.js-popup-panorama',
	popupClose: '.js-close-popup-panorama',
	popupOpen: '.js-open-popup-panorama',
	beforeOpen(popup) {

	},
	afterClose() {
	}
});


