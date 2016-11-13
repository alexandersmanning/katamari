class GameView {
	constructor(game, stage) {
		this.game = game;
		this.stage = stage;
	}

	start() {
		setInterval(() => {
			this.game.step();
			this.game.draw(this.stage);
		}, 20);
	}
}

export default GameView;