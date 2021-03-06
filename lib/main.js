require ('createjs-easeljs');
require ('howler');
import * as Cookies from "js-cookie"

import GameView from './game_view';
import Game from './game';
import KatamariCreation from './katamari_creation'

document.addEventListener("DOMContentLoaded", ()=> {
	const canvasEl = document.getElementById("fullCanvas");
	canvasEl.height = window.innerHeight;
	canvasEl.width = window.innerWidth - 10;
	$(".white-screen").fadeOut(500)
	$(".instruction-box").addClass("displayed");
	const stage = new createjs.Stage("fullCanvas");
	let gameNumber = KatamariCreation.defineNumber(canvasEl.width, canvasEl.height)
	let gameView = new GameView( new Game(canvasEl.width, canvasEl.height, gameNumber), stage);

	let volume = parseInt(Cookies.get('volume') || "100")
	$(".slider-bar").val(parseInt(volume));
	Howler.volume(volume/ 100.0)

	$(".slider-bar").change(function() {
		let volume = parseInt($(this).val());
		Howler.volume(volume / 100.0);
		Cookies.set('volume', `${volume}`, { expires: 7 });
	});

	$(".menu-toggle").click(()=> {
		$(".instruction-box").removeClass("displayed");
		$(".menu-toggle").toggleClass("open")
		$(".side-bar-content").toggleClass("open")
	})

	$(".list-item").click(function () {
		$(".info-container").not($(this).children(".info-container")).removeClass("displayed")
		$(this).children(".info-container").toggleClass("displayed");
	})

	gameView.start();	

});