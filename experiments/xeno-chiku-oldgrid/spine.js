function Spine(amount, seperation, size, spineArray) {
	this.remove = function() {
		spineArray.splice(0,spine.length);
	}
	
	this.show = function() {
		for (var i=0; i <= amount; i++) {
			var x = 0;
			var y = i * seperation;
			spineArray.push(new Particle(x,y,size));
		}
	}
}