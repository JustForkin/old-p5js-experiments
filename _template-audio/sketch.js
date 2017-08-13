beatDetect = new getSpectrum();

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
	stats.begin();

    background(0);

    if (songLoaded) {
    	beatDetect.init();

    	if (beatDetect.bass()) {
    		console.log('bass');
    	}
    }

    stats.end();
}


// function mousePressed() {}