require ('createjs-easeljs');
require ('howler');

import GameView from './game_view';
import Game from './game';
import KatamariCreation from './katamari_creation'

document.addEventListener("DOMContentLoaded", ()=> {
	const canvasEl = document.getElementById("fullCanvas");
	canvasEl.height = window.innerHeight;
	canvasEl.width = window.innerWidth - 10;
	$(".white-screen").fadeOut(500)
	const stage = new createjs.Stage("fullCanvas");
	let gameNumber = KatamariCreation.defineNumber(canvasEl.width, canvasEl.height)
	let gameView = new GameView( new Game(canvasEl.width, canvasEl.height, gameNumber), stage);

	$(".menu-toggle").click(()=> {
		$(".menu-toggle").toggleClass("open")
		$(".side-bar-content").toggleClass("open")
	})

	$(".list-item").click(function () {
		$(".info-container").not($(this).children(".info-container")).removeClass("displayed")
		$(this).children(".info-container").toggleClass("displayed");
	})
	gameView.start();	

});