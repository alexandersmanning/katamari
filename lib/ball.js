import MovingObject from './moving_object';

const DEFAULTS = {
	COLOR: "#FDFD96",
	SPEED: 0,
	RADIUS: 20,
	VEL: [0,0]
};

class Ball extends MovingObject {
	constructor(optionsHash = {}, game) {
		optionsHash.color = DEFAULTS.COLOR;
		optionsHash.radius = DEFAULTS.RADIUS;
		optionsHash.pos = optionsHash.pos;
		optionsHash.vel = DEFAULTS.VEL;

		super(optionsHash, game);

		this.sound = this.setSound();
	}

 setSound() {
	return new Howl({
		src: ['./assets/sounds/swells/swell1.mp3', './sounds/swells/swell1.ogg']
	})
 }

 moveBall(direction) {
 	this.vel = [this.vel[0] + direction[0], this.vel[1] + direction[1]]
 }

 collidedWith(object, katamariIdx) {
 		if (this.radius <= object.radius) {
 			object.radius += 3;
 			this.game.gameOver();
 			//game over
 		}	else {
 			this.game.remove(katamariIdx)
 			this.game.playSound(this);
 			this.radius += 3
 			//grow over time
 		}
 	}
}

export default Ball;