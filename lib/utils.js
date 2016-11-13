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
		// This will set the velocity for each object
		//mass is sqrt the radius
		let massOne = 3 * objectOne.radius;
		let massTwo = 3 * objectTwo.radius
		//normal vector
		let normalVector = 
			[
				objectOne.pos[0] - objectTwo.pos[0], 
				objectOne.pos[1] - objectTwo.pos[1]
			];
		//get unit normal, unit tangent
		let unitNormal = Util.unitNormalCalc(normalVector);
		let unitTangent = Util.unitTangentCalc(unitNormal);

		let vectorOneNormal = Util.previousVelocity(objectOne.vel, unitNormal)
		let vectorTwoNormal = Util.previousVelocity(objectTwo.vel, unitNormal)

		let vectorOneTangent = Util.previousVelocity(objectOne.vel, unitTangent)
		let vectorTwoTangent = Util.previousVelocity(objectTwo.vel, unitTangent)

		let vectorOnePostNormal = Util.velocityNormal(vectorOneNormal, vectorTwoNormal, massTwo, massOne)
		let vectorTwoPostNormal = Util.velocityNormal(vectorTwoNormal, vectorOneNormal, massOne, massTwo)

		let vectorOneScalarNormal = 
			[
				vectorOnePostNormal * unitNormal[0], 
				vectorOnePostNormal * unitNormal[1]
			]
		let vectorTwoScalarNormal = 
			[
				vectorTwoPostNormal * unitNormal[0], 
				vectorTwoPostNormal * unitNormal[1]
			]

		let vectorOneScalarTangent = 
			[
				vectorOneTangent * unitTangent[0], 
				vectorOneTangent * unitTangent[1]
			]
		let vectorTwoScalarTangent = 
			[
				vectorTwoTangent * unitTangent[0], 
				vectorTwoTangent * unitTangent[1]
			]

		objectOne.vel = 
			[
				vectorOneScalarNormal[0] + vectorOneScalarTangent[0],
				vectorOneScalarNormal[1] + vectorOneScalarTangent[1]
			]

		objectTwo.vel = 
			[
				vectorTwoScalarNormal[0] + vectorTwoScalarTangent[0],
				vectorTwoScalarNormal[1] + vectorTwoScalarTangent[1]
			]
	},

	unitNormalCalc: (normalVector) => {
		let magnitude = Math.sqrt(Math.pow(normalVector[0], 2) + Math.pow(normalVector[1], 2));

		return normalVector.map(el => el / magnitude);
	},

	unitTangentCalc: (unitNormal) => {
		return [-unitNormal[1], unitNormal[0]];
	},

	previousVelocity: (vel, unitSet) => {
		return (unitSet[0] * vel[0]) + (unitSet[1] * vel[1]);
	},

	velocityNormal: (vOneNormal, vTwoNormal, oneMass, twoMass) => {
		let num = vOneNormal * (oneMass - twoMass) + 2 * twoMass * vTwoNormal;
		let denom = oneMass + twoMass;

		return num / denom;
	}
};

export default Util;