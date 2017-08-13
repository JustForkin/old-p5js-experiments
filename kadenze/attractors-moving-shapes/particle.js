/*
* particle object
*/

function Particle(x, y) {
	this.pos = createVector(x, y);
	var randomvel = random(2);
	this.vel = createVector(randomvel, randomvel);
	this.acc = createVector(0, 0);
	this.mass = random(250, 500);

	this.applyForce = function(force) {
		var f = force.copy();
		f.div(this.mass);
		this.acc.add(f);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.display = function(circle) {
		// fill(0, 100);
		noStroke();
		if (circle) {
			ellipse(this.pos.x, this.pos.y, 400, 400);
		} else {
			rect(this.pos.x, this.pos.y, 400, 400);	
		}
		
	}
}

