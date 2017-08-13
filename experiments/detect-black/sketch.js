var img,
	coords = [];

function preload() {
    //load image
	img = loadImage('bw4.jpg');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);

    //set image first
    image(img, 0, 0);

    // load pixels first
    img.loadPixels();

    // than analyse image
    for (var x=0; x < img.width; x++) {
        for (var y=0; y < img.height; y++) {
        	if (img.get(x, y)[0] === 0 &&
        		img.get(x, y)[1] === 0 &&
        		img.get(x, y)[2] === 0 ) {
        		//get coordinates put them in an array
        		coords.push([x, y]);

        		// copy coords from console.log to a json file in order to skip analyzing the image
        	}
        }
     }    
}

function draw() {
	stats.begin();
	//draw stuff within coordinates
	for (var i = 0; i < 1; i++) {
		beginShape(LINES);
		var c1 = coords[floor(random(coords.length))];
		var c2 = coords[floor(random(coords.length))];

		var x1 = c1[0];
		var y1 = c1[1];
		var x2 = c2[0];
		var y2 = c2[1];

		noStroke();
		fill(255, 150, 64, 50);
		ellipse(x1, y1, 5, 5);
		ellipse(x2, y2, 5, 5);

		stroke(255, 150, 64, 50);
		vertex(x1, y1);
		vertex(x2, y2);

		endShape();
	}    
    
    noLoop();
    stats.end();
}


// function mousePressed() {}
// function mouseDragged() {}