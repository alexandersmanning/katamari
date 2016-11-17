import Game from './game'
class GameView {
	constructor(game, stage) {
		this.stage = stage;
		this.setInformation(game);
		this.game.setGameView(this)
	}

	setInformation(game) {
		this.game = game;
		this.ball = this.game.ball[0];
		this.inPlay = true;
	}

	bindKeyHandlers() {
		const ball = this.ball;

		Object.keys(GameView.MOVES).forEach( move => {
			let direction = GameView.MOVES[move];
			key(move, (() => { ball.moveBall(direction) }));
		})

		key("space", (() => { 
			this.pause();
		}))
	}

	pause() {
		this.inPlay = !this.inPlay
		$(".back-shadow").toggle();
		$("#pause-screen").toggle();
		$('.side-bar-content').toggle();
	}

	start() {
		key("enter", () => {
			$(".back-shadow").fadeOut();
			$("#start-screen").fadeOut();
			$('.side-bar-content').toggle();
			key.unbind("enter")
			this.bindKeyHandlers();
			this.playGame();
		})
	}



	playGame() {
		// window.setInterval(() => {
		// 	this.animate();
		// } ,20)
		this.lastTime = 0;
		requestAnimationFrame(this.animate.bind(this))
	}

	animate(time) {
		if (this.lastTime === 0) {
			this.lastTime = time - 20;
		}
		const timeDelta = time - this.lastTime;
		if (this.inPlay) {
			this.game.step(timeDelta);
			this.game.draw(this.stage);
		} 

		this.lastTime = time;
		requestAnimationFrame(this.animate.bind(this));
	}

}

GameView.MOVES = {
	  "w": [ 0, -.75],
	  "up": [ 0, -.75],
	  "a": [-.75,  0],
	  "left": [-.75,  0],
	  "s": [ 0,  .75],
	  "down": [0,  .75],
	  "d": [ .75,  0],
	  "right": [.75,  0]
	}

export default GameView;