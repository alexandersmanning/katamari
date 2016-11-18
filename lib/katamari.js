import MovingObject from './moving_object';
import Util from './utils';


const DEFAULTS = {
	COLOR: "#FFFFFF ",
	SPEED: 1
};

class Katamari extends MovingObject {
	constructor(optionsHash = {}, game) {
		optionsHash.color = DEFAULTS.COLOR;
		optionsHash.radius = optionsHash.radius;
		optionsHash.pos = optionsHash.pos; //get random pos
		optionsHash.vel = optionsHash.vel || Util.randomVec(DEFAULTS.SPEED);

		super(optionsHash, game);

		this.sound = this.setSound();
	}

	setSound() {
		let soundFile;

		if (this.radius < 7.5) {
			soundFile = ['./assets/sounds/clav/c023.mp3', './assets/sounds/clav/c023.ogg']
		}
		else if (this.radius < 10) {
			soundFile = ['./assets/sounds/celesta/c025.mp3', './assets/celesta/clav/c025.ogg']
		}
		else if (this.radius < 13) {
			soundFile = ['./assets/sounds/clav/c021.mp3', './assets/sounds/clav/c021.ogg']
		}
		else if (this.radius < 16) {
			soundFile = ['./assets/sounds/celesta/c022.mp3', './assets/sounds/celesta/c022.ogg']
		}
		else if (this.radius < 19) {
			soundFile = ['./assets/sounds/clav/c019.mp3', './assets/sounds/clav/c019.ogg']
		}
		else if (this.radius < 22) {
			soundFile = ['./assets/sounds/celesta/c019.mp3', './assets/celesta/clav/c019.ogg']
		}
		else if (this.radius < 25) {
			soundFile = ['./assets/sounds/clav/c017.mp3', './assets/sounds/clav/c017.ogg']
		}
		else if (this.radius < 28) {
			soundFile = ['./assets/sounds/celesta/c016.mp3', './assets/sounds/celesta/c016.ogg']
		}
		else if (this.radius < 31) {
			soundFile = ['./assets/sounds/clav/c014.mp3', './assets/sounds/clav/c014.ogg']
		}
		else if (this.radius < 34) {
			soundFile = ['./assets/sounds/celesta/c013.mp3', './sounds/celesta/c013.ogg']
		}
		else if (this.radius < 37) {
			soundFile = ['./assets/sounds/clav/c011.mp3', './sounds/celesta/c011.ogg']
		}
		else if (this.radius < 40) {
			soundFile = ['./assets/sounds/celesta/c010.mp3', './sounds/celesta/c010.ogg']
		}
		else {
			soundFile = ['./assets/sounds/clav/c008.mp3', './sounds/clav/c008.ogg']	
		}

		return new Howl({
			src: soundFile,
			volume: .15
		})
	}
}

export default Katamari;