require ('createjs-easeljs');

class MovingObject {
	constructor(optionsHash, game) {
		this.pos = optionsHash.pos;
		this.vel = optionsHash.vel;
		this.color = optionsHash.color;
		this.radius = optionsHash.radius;

		this.game = game;
	}

	draw(stage) {
		let circle = new createjs.Shape();
		circle.graphics.beginFill(this.color).drawCircle(...this.pos, this.radius);
		circle.shadow = new createjs.Shadow("#FFFFFF", 0, 0, this.radius - 2)
		stage.addChild(circle);
	}

	move (delta) {
		let velocityScale = delta / NORMAL_FRAME_TIME_DELTA
		this.pos = this.pos.map( (el, idx) => el + this.vel[idx] * velocityScale );
		this.vel = this.game.bounceOffWall(this);
	}

	isTouching(otherObject) {
		let distance = this.getDist(otherObject);
		return distance < (otherObject.radius + this.radius);
	}

	getDist(otherObject) {
		return Math.sqrt(this.pos.reduce( (sum, val, idx) => {
			return (sum + Math.pow(val - otherObject.pos[idx], 2));
		}, 0));
	}

}

const NORMAL_FRAME_TIME_DELTA = 1000/60;


export default MovingObject;