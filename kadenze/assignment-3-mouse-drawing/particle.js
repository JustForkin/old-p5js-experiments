/*
* particle object
*/

function Particle(x, y) {
	this.pos = createVector(x, y);
	var randomvel = random(2);
	this.vel = createVector(randomvel, randomvel);
	this.acc = createVector(0, 0);
	this.mass = random(1, 10);

	this.maxspeed = random(0, 5);

	this.applyForce = function(force) {
		var f = force.copy();
		f.div(this.mass);
		this.acc.add(f);
	}

	this.seek = function(target) {
	  var desired = p5.Vector.sub(target, this.pos);

	  // The seek behavior!
	  desired.setMag(this.maxspeed);

	  // Steering formula
	  var steering = p5.Vector.sub(desired, this.vel);
	  // steering.limit(this.maxforce);
	  this.applyForce(steering);

	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.display = function() {
		fill(0, 5);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 2, 2);
	}
}