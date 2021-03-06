import Katamari from './katamari';
import GameView from './game_view';
import Ball from './ball';
import Util from './utils';
import KatamariCreation from './katamari_creation';
require ('createjs-easeljs');

class Game {
	constructor(dimX, dimY, numKatamari) {
		this.dimX = dimX;
		this.dimY = dimY;
		this.numKatamari = numKatamari;
		this.playing = false;		
		this.setup();
		this.vGrid = dimX / 2;
		this.hGrid = dimY / 2;
	}

	setGameView(gameView) {
		this.gameView = gameView;
	}

	setup() {
		this.ball = [];
		this.katamari = [];

		this.addBall();
		for (let i = 0; i < this.numKatamari; i++) { this.addKatamari(i + 1); }
	}

	addKatamari(numKatamari) {
		let radius = this.randomRadius(numKatamari);
		let position = this.randomPosition(radius)
		this.katamari.push(new Katamari({pos: position, radius: radius }, this,numKatamari - 1));
	}

	addBall() {
		this.ball.push(new Ball({ pos: [this.dimX / 2, this.dimY / 2]}, this, this.volume));
	};

	draw(stage) {
		stage.removeAllChildren();
		this.allObjects().forEach( el => { 
			el.shrinkObject();
			el.draw(stage) 
		} );
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
		return this.ball[0].getDist({pos: [x, y]}) > 200;
	}

	gameOver(won) {
		if (!this.playing) {
			this.ball = []
			key.unbind("space");
				$(".back-shadow").fadeIn();
				$(".side-bar-content").show();
			if (won) {
				$("#game-won").toggleClass("modal-display")//fadeIn();
			} else {
				$("#game-lost").toggleClass("modal-display")//fadeIn();
			}

			key("enter", () => {
				$("#game-lost").removeClass("modal-display")//fadeOut();
				$("#game-won").removeClass("modal-display")//fadeOut();
				$(".white-screen").fadeIn(500, () => {
						location.reload();
				});
			})
			this.playing = true
		}
	}

	remove(idx) {
		this.katamari.splice(idx, 1)
	}

	causeCollision(object) {
		return this.allObjects().some( el => el.isTouching(object) )
	};

	randomRadius(numKatamari) {
		return KatamariCreation.katamariSize(numKatamari)
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
		 (Util.directionOfMove(object, wall) < 0) 
				)
	}


	wall(pos) {
		return { radius: 0, vel: [0,0], pos: pos }
	}

	checkCollisions() {

		let quad = this.setQuadrent();
		
		for( let k in quad){
			let keyList = Object.keys(quad[k])
			for(let i = 0; i < keyList.length - 1; i++) {
				for (let j = i + 1 ; j < keyList.length; j++) {
					if(quad[k][keyList[i]].isTouching(quad[k][keyList[j]])) {
						this.ifCollided(quad[k][keyList[i]], quad[k][keyList[j]], keyList[i], keyList[j])
					}
				}
			}
		}
		
	}

	ifCollided(objectOne, objectTwo, i, j) {
		if (objectOne instanceof Ball) {
			objectOne.collidedWith(objectTwo, j)
		} else if (objectTwo instanceof Ball) {
			objectTwo.collidedWith(objectOne, i)
		} else if (Util.directionOfMove(objectOne, objectTwo) < 0 ) {
			Util.collisionVelocity(objectOne, objectTwo)
			this.playSound(objectOne)
			this.playSound(objectTwo)	
		}
	}


	setQuadrent() {
		let quadrent = [{}, {}, {}, {}];
		this.allObjects().forEach((obj, idx)=> {
			if (obj.pos[0] + obj.radius > this.hGrid) {
				if (obj.pos[1] + obj.radius > this.vGrid) {
					quadrent[3][idx] = obj;
				};
				if (obj.pos[1] - obj.radius < this.vGrid) {
					quadrent[2][idx] = obj;
				}
			};
			if (obj.pos[0] - obj.radius < this.hGrid) {
				if (obj.pos[1] + obj.radius > this.vGrid) {
					quadrent[0][idx] = obj;
				};
				if (obj.pos[1] - obj.radius < this.vGrid) {
					quadrent[1][idx] = obj;
				}
			};
		})

		return quadrent;
	}

	playSound(object) {
		if (object.sound.state() === "loaded" && !object.sound.playing()) {
			object.sound.play()
		}
	}
}

export default Game;
