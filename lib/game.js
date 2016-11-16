import Katamari from './katamari';
import GameView from './game_view';
import Ball from './ball';
import Util from './utils';
require ('createjs-easeljs');

class Game {
	constructor(dimX, dimY, numKatamari) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.numKatamari = numKatamari;
		this.playing = true;
		this.setup();
	}

	setGameView(gameView) {
		this.gameView = gameView;
	}

	setup() {
		this.ball = [];
		this.katamari = [];

		this.addBall();
		for (let i = 0; i < this.numKatamari; i++) { this.addKatamari(); }
	}

	addKatamari() {
		// need to make sure they aren't made on top on one another
		let radius = this.randomRadius();
		let position = this.randomPosition(radius)
		this.katamari.push(new Katamari({pos: position, radius: radius }, this));
	}

	addBall() {
		this.ball.push(new Ball({ pos: [this.dimX / 2, this.dimY / 2]}, this));
	};

	draw(stage) {
		stage.removeAllChildren();
		this.allObjects().forEach( el => el.draw(stage) );
		stage.update();
	}

	allObjects() {
		return this.katamari.concat(this.ball)
	}

	randomPosition(radius) {
		//bad way
		let x = this.dimX * Math.random();
		let y = this.dimY * Math.random();
		while (!this.isValid(x, y, radius)) {
			x = this.dimX * Math.random();
			y = this.dimY * Math.random();
		};

		return [x, y];
	}

	isValid(x,y, radius) {

		if (x - radius < 0 || x + radius > this.dimX || y - radius < 0 || y + radius > this.dimY) {
			return false;
		}
		else if (this.causeCollision({pos: [x, y], radius: radius})) {
			return false;
		}
		else {
			return (this.nearShip(x, y));
		}
	}

	nearShip(x,y) {
		return this.ball[0].getDist({pos: [x, y]}) > 100;
	}

	gameOver(won) {
		this.ball = []
		key.unbind("space");

		if (won) {

			$(".back-shadow").fadeIn();
			$("#game-won").fadeIn();
		} else {
			$(".back-shadow").fadeIn();
			$("#game-lost").fadeIn();
		}

		key("enter", () => {
			$("#game-lost").fadeOut();
			$("#game-won").fadeOut();
			$(".white-screen").fadeIn(500, () => {
					location.reload();
			});
		})
	}

	remove(idx) {
		this.katamari.splice(idx, 1)
	}

	causeCollision(object) {
		return this.allObjects().some( el => el.isTouching(object) )
	};

	randomRadius() {
		return Math.random() * 45 + 2;
	}

	step(delta) {
		if (this.katamari.length === 0) {
			this.gameOver(true);
		} else {
			this.moveObject(delta)
			this.checkCollisions()
		}
	}

	moveObject(delta) {
		this.allObjects().forEach( el => el.move(delta) );
	}

	bounceOffWall(object) {
		let radius = 0;
		let vel = [0, 0];

		if (
				this.touchingDirection(object, this.wall([0, object.pos[1]])) ||
				this.touchingDirection(object, this.wall([this.dimX, object.pos[1]]))
			) {
			return [-object.vel[0], object.vel[1]];
		} else if (
				this.touchingDirection(object, this.wall([object.pos[0], 0])) ||
				this.touchingDirection(object, this.wall([object.pos[0], this.dimY]))
		) {
			return [object.vel[0], -object.vel[1]];
		} else {
			return object.vel;
		}
	}

	touchingDirection(object, wall) {
		return (object.isTouching(wall)  && 
		 (Util.directionOfMove(object, wall) < 0 || (object instanceof Ball && object.radius < 10 ))
				)
		//|| object instanceof Ball
	}


	wall(pos) {
		return { radius: 0, vel: [0,0], pos: pos }
	}

	checkCollisions() {
		for(let i = 0; i < this.allObjects().length - 1; i++) {
			for (let j = i + 1 ; j < this.allObjects().length; j++) {
				if(this.allObjects()[i].isTouching(this.allObjects()[j])) {
					if (this.allObjects()[i] instanceof Ball) {
						this.allObjects()[i].collidedWith(this.allObjects()[j], j)
					} else if (this.allObjects()[j] instanceof Ball) {
						this.allObjects()[j].collidedWith(this.allObjects()[i], i)
					} else if (Util.directionOfMove(this.allObjects()[i], this.allObjects()[j]) < 0 ) {
						Util.collisionVelocity(this.allObjects()[i], this.allObjects()[j])
						this.playSound(this.katamari[i])
						this.playSound(this.katamari[j])	
					}
				}
			}
		}
	}

	playSound(object) {
		if (object.sound.state() === "loaded" && !object.sound.playing()) {
			object.sound.play()
		}
	}
}

export default Game;
