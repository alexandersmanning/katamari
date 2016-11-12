class MovingObject {
	constructor(optionsHash) {
		this.pos = optionsHash.pos;
		this.vel = optionsHash.vel;
		this.color = optionsHash.color;
		this.radius = optionsHash.radius;
	}

	draw(ctx) {
		
	}
}

export default MovingObject;