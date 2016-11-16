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

		if (this.radius < 3) {
			soundFile = ['./assets/sounds/clav/c023.mp3', './assets/sounds/clav/c023.ogg']
		}
		else if (this.radius < 5) {
			soundFile = ['./assets/sounds/celesta/c025.mp3', './assets/celesta/clav/c025.ogg']
		}
		else if (this.radius < 7) {
			soundFile = ['./assets/sounds/clav/c023.mp3', './assets/sounds/clav/c023.ogg']
		}
		else if (this.radius < 10) {
			soundFile = ['./assets/sounds/celesta/c019.mp3', './assets/sounds/celesta/c019.ogg']
		}
		else if (this.radius < 13) {
			soundFile = ['./assets/sounds/clav/c019.mp3', './assets/sounds/clav/c019.ogg']
		}
		else if (this.radius < 15) {
			soundFile = ['./assets/sounds/celesta/c017.mp3', './assets/celesta/clav/c017.ogg']
		}
		else if (this.radius < 18) {
			soundFile = ['./assets/sounds/clav/c016.mp3', './assets/sounds/clav/c016.ogg']
		}
		else if (this.radius < 20) {
			soundFile = ['./assets/sounds/celesta/c014.mp3', './assets/sounds/celesta/c014.ogg']
		}
		else if (this.radius < 25) {
			soundFile = ['./assets/sounds/clav/c013.mp3', './assets/sounds/clav/c013.ogg']
		}
		else if (this.radius < 30) {
			soundFile = ['./assets/sounds/clav/c010.mp3', './sounds/clav/c010.ogg']
		}
		else {
			soundFile = ['./assets/sounds/celesta/c007.mp3', './sounds/celesta/c007.ogg']	
		}

		return new Howl({
			src: soundFile,
			volume: .15
		})
	}
}

export default Katamari;