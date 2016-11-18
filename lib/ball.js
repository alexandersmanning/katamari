import MovingObject from './moving_object';

const DEFAULTS = {
	COLOR: "#FDFD7D",
	SPEED: 0,
	RADIUS: 10,
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
		src: ['./assets/sounds/swells/swell2.mp3', './sounds/swells/swell2.ogg'],
		volume: 1
	})
 }

 moveBall(direction) {
 	let velX = this.vel[0] + direction[0];
 	let velY = this.vel[1] + direction[1];


 	if ( velX > 0) { velX = Math.min( velX, 10) }
 		else { velX = Math.max(velX, -10) }

 	if (velY > 0) { velY = Math.min( velY, 10) }
 		else { velY = Math.max(velY, -10) }

 	this.vel = [velX, velY]

 }

 collidedWith(object, katamariIdx) {
 		if (this.radius <= object.radius) {
 			object.radius += 1.5;
 			this.game.gameOver(false);
 		}	else {
 			this.game.remove(katamariIdx)
 			this.game.playSound(this);
 			this.radius += 1.5
 		}
 	}
}

export default Ball;