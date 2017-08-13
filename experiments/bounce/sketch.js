var particles = [];
var soundFile;

function preload() {
    soundFile = loadSound('priest-cut.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // center for origin
    translate(windowWidth / 2, windowHeight / 2);

    // setup the particles
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < 5; j++) {
            particles.push(new Particle( -i * 50, -i * (i/15 * 15) + (j * 25) ));
        }

        for (var j = 0; j < 10; j++) {
            particles.push(new Particle(-i * 50, -i + (j * 25)));
        }
    }

    amplitude = new p5.Amplitude();

    // soundFile.play();

    amplitude.setInput(soundFile);
    amplitude.smooth(0.9);

    // // var btn = document.querySelector('.play');
    // // btn.addEventListener('click', function() {
    // //     soundFile.play();
    // // });
}

function draw() {
    background(0);

    var level = amplitude.getLevel();
	detectBeat(level);

	for (var i = 0; i < particles.length; i++) {
	    particles[i].bounce(5, .2);
	    particles[i].update();
	    particles[i].display();
	}
}

function onBeat() {
	for (var i = 0; i < particles.length; i++) {
	    particles[i].bounce(2, 2);
	}
}

