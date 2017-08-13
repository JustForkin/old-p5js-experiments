// particles with x,y coordinates

function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.applyForce = function(force) {
        var f = force.copy();
        this.acc.add(f);
    }

    // bounds is the max difference
    // duration in seconds for a single cycle, 
    this.bounce = function(bounds, duration) {
        var f = cos(TWO_PI * frameCount / (duration * 60));
        var bounce = f * bounds;
        this.pos.add(0, bounce);
    }

    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.display = function() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}