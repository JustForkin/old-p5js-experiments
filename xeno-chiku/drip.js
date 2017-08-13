// drips with x,y coordinates
// is always pulled down by same gravitational force
// has a lifespan
// todo: use particle object instead of creating smth new

function Drip(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.f = createVector(0, .1);
    this.respawn = false;
    
    // let's only move the top ones and cause the others to react
    this.applyForce = function() {
        force = this.f.copy();
        force.add(0, force.y + force.y/30);
    	this.acc.add(force);
    }

    // todo: somehow define lifespan per drip per situation
    this.lifespan = function(y, lifespan) {
        if (y > lifespan) {
            drips.splice(0, 1);
            if (this.respawn) {
                drips.push(new Drip(0, 0));
            }
        }
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