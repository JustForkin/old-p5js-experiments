var particles = [];
var angle;
var increment;

function setup() {
  createCanvas(600, 600, WEBGL);
  var sp = height / 10;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      particles.push(new Particle(i * sp, j * sp));
    }
  }
  angle = 0;
  increment = PI / 180;
}

function draw() {
  translate(width / 2, height / 2);
  rotateY(angle += increment);
  translate(-width, -height);
  for (var i = 0; i < particles.length; i++)
    particles[i].draw();
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.draw = function() {
    push();
    translate(this.x, this.y);
    sphere(17);
    pop();
  }
}