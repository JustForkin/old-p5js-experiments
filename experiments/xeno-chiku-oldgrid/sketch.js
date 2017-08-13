// todo: make 1 eye object with update, display, wink(?) methods
// todo: intro animation

var eye;
var spine;
var spineL;
var spineR;
var spineDiscs = [];
var spineLDiscs = [];
var spineRDiscs = [];

var gridLeftA = [];
var gridLeftIA = [];
var gridRightA = [];
var gridRightIA = [];

var drips = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    var w = windowWidth/2, 
		h = windowHeight/3,
		cols = 17, 
		rows = 6, 
		fl = 20;
    gridLeft = new Grid(w, h, cols, rows, fl, gridLeftA);
    gridLeft.create();
    gridLeftI = new Grid(w, h, cols, rows, fl, gridLeftIA, false, true);
    gridLeftI.create();
    
    gridRight = new Grid(w, h, cols, rows, fl, gridRightA, true);
    gridRight.create();
    gridRightI = new Grid(w, h, cols, rows, fl, gridRightIA, true, true);
    gridRightI.create();

    spine = new Spine(7, 40, 2, spineDiscs);
    spine.show();
    spineL = new Spine(6, 40, 5, spineLDiscs);
    spineL.show();
    spineR = new Spine(6, 40, 5, spineRDiscs);
    spineR.show();
}

function draw() {
    background(0);
    noFill();
    // set center of browser as origin (0,0)
	translate(windowWidth/2, windowHeight/2);

    push();
    	translate(0, -windowHeight/3);

    	/*
    		draw eye
    	*/ 
    	var eye = new Eye();

    	/*
    		draw spine
    	*/ 
    	translate(0, windowHeight/5);
    	
    	for (var i = 0; i < spineDiscs.length; i++) {
    	    // spineDiscs[i].bounce(5, .2);
    	    spineDiscs[i].update();
    	    spineDiscs[i].display();
    	}

    	push();
	    	translate(-25, 20);
	    	for (var i = 0; i < spineLDiscs.length; i++) {
	    	    // spineLDiscs[i].bounce(5, .2);
	    	    spineLDiscs[i].update();
	    	    spineLDiscs[i].display();
	    	}
    	pop();

    	
    	push();
	    	translate(25, 20);
	    	for (var i = 0; i < spineRDiscs.length; i++) {
	    	    // spineRDiscs[i].bounce(5, .2);
	    	    spineRDiscs[i].update();
	    	    spineRDiscs[i].display();
	    	}
    	pop();
    pop();

    /*
		draw grids of particles
    */
    push();
	    translate(-windowWidth/3.25, 0);
	    for (var i = 0; i < gridLeftA.length; i++) {
	        // gridLeftA[i].bounce(5, .2);
	        gridLeftA[i].update();
	        gridLeftA[i].display();
	    }

	    for (var i = 0; i < gridLeftIA.length; i++) {
	        // gridLeftIA[i].bounce(5, .2);
	        gridLeftIA[i].update();
	        gridLeftIA[i].display();
	    }
    pop();

    push();
	    translate(windowWidth/3.25, 0);
	    for (var i = 0; i < gridRightA.length; i++) {
	        // gridRightA[i].bounce(5, .2);
	        gridRightA[i].update();
	        gridRightA[i].display();
	    }

	    for (var i = 0; i < gridRightIA.length; i++) {
	        // gridRightIA[i].bounce(5, .2);
	        gridRightIA[i].update();
	        gridRightIA[i].display();
	    }
    pop();

    /*
    	draw horizon
    */ 
    
    translate(0, height / 6);
    stroke(255);
    line(0,0,windowWidth/2, windowHeight/4+50);
    line(0,0,-windowWidth/2, windowHeight/4+50);
    strokeWeight(3);
    line(0,0,windowWidth/2, windowHeight/4+125);
    line(0,0,-windowWidth/2, windowHeight/4+125);


    /*
		draw 
    */
    translate(0, windowHeight/6);
    ellipse(0,0,2,1);
    strokeWeight(3);
    drawEyeArcs(0, 0, 20, 5);
    strokeWeight(1);
    drawEyeArcs(0, 0, 40, 8);

    push();
    	translate(75, -10);
	    strokeWeight(1);
	    ellipse(0,0,2,1);
	    strokeWeight(3);
	    drawEyeArcs(0, 0, 20, 5);
    pop();

    push();
    	translate(-75, -10);
	    strokeWeight(1);
	    ellipse(0,0,2,1);
	    strokeWeight(3);
	    drawEyeArcs(0, 0, 20, 5);
    pop();

    translate(0, windowHeight/10);
    strokeWeight(1);
    ellipse(0,0,2,1);
    strokeWeight(1);
    drawEyeArcs(0, 0, 35, 6);
    drawEyeArcs(0, 0, 40, 6);
    strokeWeight(2);
    drawEyeArcs(0, 0, 44, 7);
    drawEyeArcs(0, 0, 50, 7);
    strokeWeight(1);
    drawEyeArcs(0, 0, 55, 8);
    drawEyeArcs(0, 0, 60, 8);

    drawEyeVertices(0, 0, 15, 25, 12);


    /*
		draw drips
    */
    translate(0, height / 4);

    for (var i = 0; i < drips.length; i++) {
        drips[i].applyForce();
        drips[i].update();
        drips[i].display();
        drips[i].lifespan(drips[i].pos.y, 200);
    }
}

function mousePressed() {
    drips.push(new Drip(0, 0));
}

