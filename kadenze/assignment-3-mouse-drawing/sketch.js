var particles = [],
	attractors = [];

var target;

/*
* init
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(180, 80);

  for (var i = 0; i < 200; i++) {
  	// this seems arbitrary, but it's keeping the particles not too close to the edge
  	var offset = 100;
  	var x = random(offset, windowWidth - offset),
  		y = random(offset, windowHeight - offset);

  	particles.push(new Particle(x, y));
  }

  for (var i = 0; i < 5; i++) {
  	// this seems arbitrary, but it's keeping the attractors close to the center
  	var wOffset = windowWidth/3;
  	var hOffset = windowHeight/3;
  	var x = random(wOffset, windowWidth-wOffset),
  		y = random(hOffset, windowHeight-hOffset);

  	attractors.push(new Attractor(x, y));
  }
}

/*
* animate it
*/
function draw() {
	// draw all attractors on random positions
	for (var i = 0; i < attractors.length; i++) {
		attractors[i].display();
	}

	// let's draw all particles first and
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].display();

		// Seek the target
		if (target) {
			if (i % 5 === 1) {
				particles[i].seek(target);
			}
		}

		// than we apply forces of all attractors to particle and calculate direction
		for (var j = 0; j < attractors.length; j++) {
			var attraction = attractors[j].calculateForce(particles[i]);
			particles[i].applyForce(attraction);
		}	
	}
}

function mouseDragged() {
	target = createVector(mouseX, mouseY);
}

function mouseReleased() {
	target = '';	
}
