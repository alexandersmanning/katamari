require ('createjs-easeljs');
require ('howler');

import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", ()=> {
	//set height and width
	const canvasEl = document.getElementById("fullCanvas");
	canvasEl.height = window.innerHeight - 100;
	canvasEl.width = window.innerWidth - 10;
	// canvasEl.style.backgroundColor = "#1A232D"
	const stage = new createjs.Stage("fullCanvas");
	let gameView = new GameView( new Game(canvasEl.width, canvasEl.height, 35), stage);


	gameView.start();	

});