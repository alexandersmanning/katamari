require ('createjs-easeljs');
require ('howler');

import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", ()=> {
	const canvasEl = document.getElementById("fullCanvas");
	canvasEl.height = window.innerHeight - 80;
	canvasEl.width = window.innerWidth - 10;
	$(".white-screen").fadeOut(500)
	const stage = new createjs.Stage("fullCanvas");
		let gameView = new GameView( new Game(canvasEl.width, canvasEl.height, 35), stage);


	gameView.start();	

});