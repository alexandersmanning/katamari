
class GameView {
	constructor(game, stage) {
		this.game = game;
		this.stage = stage;
		this.ball = this.game.addBall();
	}

	bindKeyHandlers() {
		const ball = this.ball;

		Object.keys(GameView.MOVES).forEach( move => {
			let direction = GameView.MOVES[move];
			key(move, (() => { ball.moveBall(direction) }))
		})
	}

	start() {
		this.bindKeyHandlers();
		this.lastTime = 0;
		requestAnimationFrame(this.animate.bind(this))
	}

	animate(time) {
		const timeDelta = time - this.lastTime;
		this.game.step(timeDelta);
		this.game.draw(this.stage)
		this.lastTime = time;

		requestAnimationFrame(this.animate.bind(this));
	}

}

GameView.MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	}

export default GameView;