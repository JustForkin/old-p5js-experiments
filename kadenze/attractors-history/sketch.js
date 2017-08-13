var particles = [],
	attractors = [];

/*
* init
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(180, 80);

  // removed due to mousedPressed(), keeping for future reference
  // for (var i = 0; i < 10; i++) {
  // 	var offset = 100;
  // 	var x = random(offset, windowWidth-offset),
  // 		y = random(offset, windowHeight-offset);

  // 	particles.push(new Particle(x, y));
  // }

  for (var i = 0; i < 5; i++) {
  	var wOffset = windowWidth/4;
  	var hOffset = windowHeight/4;
  	var x = random(wOffset, windowWidth-wOffset),
  		y = random(hOffset, windowHeight-hOffset);

  	// attractors.push(new Attractor(x, y));
  	attractors.push(new Attractor(x, y));
  }
}

/*
* animate it
*/
function draw() {
	// background(180, 80);

	// draw all attractors on random positions
	for (var i = 0; i < attractors.length; i++) {
		attractors[i].display();
	}

	// let's move and display all particles
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].display();

		// than we apply forces of all attractors to particle and calculate direction
		for (var j = 0; j < attractors.length; j++) {
			var attraction = attractors[j].calculateForce(particles[i]);
			particles[i].applyForce(attraction);
		}
	}
}

function mousePressed() {
	var x = mouseX + random(-50,50);
	var y = mouseY + random(-50,50);
	
	// I'm lazy, let's push 5 particles
	particles.push( new Particle(x, y), 
					new Particle(x, y),
					new Particle(x, y),
					new Particle(x, y),
					new Particle(x, y));
}


/*
* particle object
*/

function Particle(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(random(-2,2), random(-2,2));
	this.acc = createVector(0, 0);
	this.mass = random(1, 10);
	this.history = [];
	// this.mass = 1;

	this.applyForce = function(force) {
		var f = force.copy();
		// acceleration = force / mass
		f.div(this.mass);
		this.acc.add(f);
	}

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

		// let's fill history and display it
		var v = createVector(this.pos.x, this.pos.y);
		this.history.push(v);
	}

	this.display = function() {
		fill(255, 0, 0, 50);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 2, 2);
		
		// IGNORE
		// small test with saving history of particles
		// var hist = this.history;
		// for (var i = 0; i < hist.length; i++) {
		// 	// fill(0, 10);
		// 	stroke(0, 10);
		// 	// noStroke();
		// 	line(hist[i].x, hist[i].y, 5, 5);
		// }

		// if (hist.length > 10) hist.splice(0,1);
	}
}

/*
* attractor object
*/

function Attractor(x, y) {
	this.pos = createVector(x, y);
	this.mass = random(1, 5);
	// this.mass = 1;

	this.calculateForce = function(particle) {
		var force = p5.Vector.sub(this.pos, particle.pos);
		var distance = force.mag();
		var unit = force.normalize();

		// force = mass * acceleration
		// A = F / M
		// A = F
		// particle

		// let's set random attraction strength for each attractor
		distance = constrain(distance, 5, 25);
		strength = this.mass * particle.mass / (distance * distance);
		force.mult(strength);

		return force;
	}

	this.display = function() {
		fill(0, 0);
		// noStroke();
		ellipse(this.pos.x, this.pos.y, 5, 5);
	}
}