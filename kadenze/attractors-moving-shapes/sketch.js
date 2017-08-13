var particles = [],
	attractors = [];

var circle = true;
/*
* init
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (var i = 0; i < 150; i++) {
  	// this seems arbitrary, but it's keeping the particles not too close to the edge
  	var offset = 100;
  	var x = random(0, windowWidth),
  		y = random(0, windowHeight);

  	particles.push(new Particle(x, y));
  }

  for (var i = 0; i < 5; i++) {
  	// this seems arbitrary, but it's keeping the attractors close to the center
  	var wOffset = -150;
  	var hOffset = -150;
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
		
    if (circle) {
      circle = !circle;
      particles[i].display(circle);
    } else {
      circle = !circle;
      particles[i].display(circle);
    }


    if (i % 2 === 1) {
      fill(0);
    } 

    if (i % 3 === 1) {
      fill(255);
    }

    // if (i % 25 === 1) {
    //   fill(255)
    // }

		// than we apply forces of all attractors to particle and calculate direction
		for (var j = 0; j < attractors.length; j++) {
			var attraction = attractors[j].calculateForce(particles[i]);
			particles[i].applyForce(attraction);
		}	
	}
}
