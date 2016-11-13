import MovingObject from './moving_object';
import Util from './utils';

const DEFAULTS = {
	COLOR: "#000000",
	SPEED: 1
};

class Katamari extends MovingObject {
	constructor(optionsHash = {}, game) {
		optionsHash.color = DEFAULTS.COLOR;
		optionsHash.radius = Math.random() * 25;
		optionsHash.pos = optionsHash.pos; //get random pos
		optionsHash.vel = optionsHash.vel || Util.randomVec(DEFAULTS.SPEED);

		super(optionsHash, game);
	}
}

export default Katamari;