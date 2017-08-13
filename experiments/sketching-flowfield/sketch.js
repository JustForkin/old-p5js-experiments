var particles = [];

// Using this variable to decide whether to draw all the stuff
var debug = false;

// Flowfield object
var flowfield;
var target;

/*
* init
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  // Make a new flow field
  flowfield = new FlowField(10);

  for (var i = 0; i < 200; i++) {
  	// this seems arbitrary, but it's keeping the particles not too close to the edge
  	var offset = 100;
  	var x = random(offset, windowWidth - offset),
  		y = random(offset, windowHeight - offset);

  	particles.push(new Particle(x, y, random(2, 5), random(0.1, 0.5), random(1, 3)));
  }
}

/*
* animate it
*/
function draw() {
	
	// Display the flowfield in "debug" mode
	// bug: currently can't turn off because I'm not reseting the background
	if (debug) flowfield.display();
	
	// let's draw all particles first and
	for (var i = 0; i < particles.length; i++) {
		// Tell all the particles to follow the flow field
		particles[i].follow(flowfield);
		particles[i].run();

		// Seek the mousePos when pressing mousebutton
		if (target) {
			if (i % 5 === 1) {
				particles[i].seek(target);
			}
		}
	}
}

// when mouse is pressed create a vector that the particles seek
function mouseDragged() {
	target = createVector(mouseX, mouseY);
}

function mouseReleased() {
	target = '';	
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
   }

  if (key == 'F') {
  	flowfield.init();
  }
}