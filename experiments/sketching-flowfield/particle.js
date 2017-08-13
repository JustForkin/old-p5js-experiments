/*
* particle object
*/

function Particle(x, y, ms, mf, r) {
	this.pos = createVector(x, y);
	this.vel = createVector(0,0);
	this.acc = createVector(0, 0);
	this.mass = random(1, 10);
	this.r = r || 2;
	this.maxspeed = ms || 4;
	this.maxforce = mf || 0.1;

	// let's run all functions
	this.run = function() {
		this.display();
		this.update();
		this.reappear();
	}

	this.applyForce = function(force) {
		var f = force.copy();
		f.div(this.mass);
		this.acc.add(f);
	}

	// Implementing Reynolds' flow field following algorithm
	// http://www.red3d.com/cwr/steer/FlowFollow.html
	this.follow = function(flow) {
	  // What is the vector at that spot in the flow field?
	  var desired = flow.lookup(this.pos);
	  // Scale it up by maxspeed
	  desired.mult(this.maxspeed);
	  // Steering is desired minus velocity
	  var steer = p5.Vector.sub(desired, this.vel);
	  steer.limit(this.maxforce);  // Limit to maximum steering force
	  this.applyForce(steer);
	}

	this.seek = function(target) {
	  var desired = p5.Vector.sub(target, this.pos);

	  desired.setMag(this.maxspeed);

	  // Steering formula
	  var steering = p5.Vector.sub(desired, this.vel);
	  this.applyForce(steering);
	}

	this.reappear = function() {
		if (this.pos.x < -this.r) this.pos.x = width+this.r;
		if (this.pos.y < -this.r) this.pos.y = height+this.r;
		if (this.pos.x > width+this.r) this.pos.x = -this.r;
		if (this.pos.y > height+this.r) this.pos.y = -this.r;
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.display = function() {
		fill(0, 5);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}
}