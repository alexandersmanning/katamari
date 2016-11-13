require ('createjs-easeljs');
// import MovingObject from './moving_object';
import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", ()=> {
	//set height and width
	const canvasEl = document.getElementById("fullCanvas");
	canvasEl.height = window.innerHeight;
	canvasEl.width = window.innerWidth;
	const stage = new createjs.Stage("fullCanvas");
	let gameView = new GameView( new Game(canvasEl.width, canvasEl.height, 10), stage);

	gameView.start();	
});