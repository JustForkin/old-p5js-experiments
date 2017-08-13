/*
* attractor object
*/

function Attractor(x, y) {
	this.pos = createVector(x, y);
	this.mass = random(1, 5);

	this.calculateForce = function(particle) {
		var force = p5.Vector.sub(this.pos, particle.pos);
		var distance = force.mag();
		var unit = force.normalize();

		distance = constrain(distance, 5, 25);
		strength = this.mass * particle.mass;
		force.mult(strength/20000);
		return force;
	}

	this.display = function() {
		fill(0, 0);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 5, 5);
	}
}