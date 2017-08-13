// particles with x,y coordinates
// todo: make them bounce (need attractor?)

function Particle(x, y, size) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    // bounds is the max difference
    // duration in seconds for a single cycle, 
    this.bounce = function(bounds, duration) {
        var f = cos(TWO_PI * frameCount / (duration * 60));
        var bounce = f * bounds;
        this.pos.add(0, bounce);
    }
    
    // let's only move the top ones and cause the others to react
    this.applyForce = function(force) {
    	var f = force.copy();
    	this.acc.add(f);
    }

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.display = function() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, size, size);
    }
}