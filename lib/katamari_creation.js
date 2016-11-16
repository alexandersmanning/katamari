const KatamariCreation = {
	DIV: 40000,
	defineNumber: (dimX, dimY) => {
		return parseInt((dimX * dimY) / KatamariCreation.DIV)
	},

	katamariSize: (noKatamari) => {
		if (noKatamari <= 7) {
			return KatamariCreation.provideRandom(5);
		}
		else if (noKatamari < 13) {
			return KatamariCreation.provideRandom(14);
		}
		else if (noKatamari < 19) {
			return KatamariCreation.provideRandom(20.5);
		}
		else if (noKatamari < 24) {
			return KatamariCreation.provideRandom(28);
		}
		else if (noKatamari < 27) {
			return KatamariCreation.provideRandom(35.5);
		}
		else if (noKatamari < 31) {
			return KatamariCreation.provideRandom(43);
		}
		else if (noKatamari < 34) {
			return KatamariCreation.provideRandom(50.5);
		}
		else if (noKatamari < 37) {
			return KatamariCreation.provideRandom(57.5);
		}
		else if (noKatamari < 40) {
			return KatamariCreation.provideRandom(65.5);
		}
		else if (noKatamari > 40) {
			return KatamariCreation.provideRandom(73);	
		}
	},

	provideRandom: (factor) => {
		return Math.random() * 5 + factor;
	}
}

export default KatamariCreation;