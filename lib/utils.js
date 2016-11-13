export const randomVector = (length) => {
	const deg = 2 * Math.PI * Math.random();
};

const Util = {
	randomVec: (length) => {
		const deg = 2 * Math.PI * Math.random();
		return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	},

	scale: (vec, m) => {
		return [vec[0] * m, vec[1] * m];
	},

	collisionVelocity: (objectOne, objectTwo) => {
		console.log("something good here")
	}
};

export default Util;