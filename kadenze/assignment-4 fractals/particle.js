function Particle(x, y, a) {
    this.pos = createVector(x, y);
    this.vel = createVector(sin(random(0,TWO_PI)), cos(random(0,TWO_PI)));
    this.acc = createVector(0, 0);
    this.alpha = a;

    this.run = function() {
        this.update();
        this.display();
    }

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
        noFill();
        stroke(255, this.alpha);
        this.alpha -= controls.subtractAlpha;

        // just playing around with different figures
        // rect(this.pos.x, this.pos.y, controls.size, controls.size);
        ellipse(this.pos.x, this.pos.y, controls.size, controls.size);
        // line(this.pos.x, this.pos.y, this.pos.x + controls.size * Math.floor(random(-1,1)), this.pos.y + controls.size * Math.floor(random(-1,1)));
        
    }
}