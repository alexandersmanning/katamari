import Katamari from './katamari';
import Util from './utils'
require ('createjs-easeljs');

class Game {
	constructor(dimX, dimY, numKatamari) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.numKatamari = numKatamari;

		this.katamari = [];

		for (let i = 0; i < this.numKatamari; i++) { this.addKatamari(); }
	}

	addKatamari() {
		// need to make sure they aren't made on top on one another
		this.katamari.push(new Katamari({pos: this.randomPosition() }, this));
	}

	draw(stage) {
		stage.removeAllChildren();
		this.katamari.forEach( el => el.draw(stage) );
		stage.update();
	}

	randomPosition() {
		return [this.dimX * Math.random(), this.dimY * Math.random()];
	}

	step() {
		this.moveObject()
		this.checkCollisions()
	}

	moveObject() {
		this.katamari.forEach( el => el.move() );
	}

	bounceOffWall(object) {
		if (object.isTouching({ pos:[0, object.pos[1]], radius: 0 }) || 
				object.isTouching({ pos:[this.dimX, object.pos[1]], radius: 0 })) {
			return [-object.vel[0], object.vel[1]];
		}
		else if (object.isTouching({ pos:[object.pos[0], 0], radius: 0 }) || 
				object.isTouching({ pos:[object.pos[0], this.dimY], radius: 0 })) {
			return [object.vel[0], -object.vel[1]];
		}
		else {
			return object.vel;
		}
	}

	checkCollisions() {
		for(let i = 0; i < this.katamari.length - 1; i++) {
			for (let j = i + 1 ; j < this.katamari.length; j++) {
				if(this.katamari[i].isTouching(this.katamari[j])) {
					Util.collisionVelocity(this.katamari[i], this.katamari[j])
				  break;
				}
			}
		}
	}
}

export default Game;

// debugger
// 					Util.collisionVelocity(this.katamari[i], this.katamari[j])
// 				  break;