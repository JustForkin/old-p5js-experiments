/*
	DAT GUI
*/
var stats = new Stats();

var controls = new function() {
     this.size = 15;
     this.amount = 10;
     this.subtractAlpha = 5;
     this.startAlpha = 255;
}

window.onload = function() {
	var gui = new dat.GUI();
	
	gui.add(controls, 'size', 0, 100);
	gui.add(controls, 'amount', 0, 50);
	gui.add(controls, 'subtractAlpha', 0, 10);
	gui.add(controls, 'startAlpha', 0, 255);
	
	gui.remember(controls);


	//STATS
	var fpsMonitor = document.getElementById('fps-monitor');
	fpsMonitor.appendChild(stats.domElement);
	stats.domElement.id = "stats";
}

