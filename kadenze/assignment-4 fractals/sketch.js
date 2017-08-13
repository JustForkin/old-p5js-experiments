// function preload() {}

var particleArray = [];
var sAlpha = controls.startAlpha;

function setup() {
    createCanvas(windowWidth, windowHeight);
	background(0);
	showParticles(sAlpha);
}

function draw() {
	// start monitoring FPS
    stats.begin();

    // run all particles
    for (var i = 0; i < particleArray.length; i++) {
    	particleArray[i].run();
    }

    // recursivly add more
    sAlpha -= controls.subtractAlpha;
    if (sAlpha < 0) {
    	sAlpha = controls.startAlpha;
    	showParticles(sAlpha);
    }

    stats.end();
}

function showParticles(alpha) {
	var xr = random(0, windowWidth);
	var yr = random(0, windowHeight);

	// first remove old
	particleArray.splice(0, controls.size);

	// than add new
	for (var i = 0; i < controls.amount; i++) {
		particleArray.push(new Particle(xr, yr, alpha));
	}
}
