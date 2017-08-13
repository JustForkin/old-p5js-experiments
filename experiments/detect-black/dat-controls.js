/*
	DAT GUI
*/
var stats = new Stats();

var controls = new function() {
     this.control = 1;
}

window.onload = function() {
	var gui = new dat.GUI();
	gui.add(controls, 'control', 0, 10);
	gui.remember(controls);


	//STATS
	var fpsMonitor = document.getElementById('fps-monitor');
	fpsMonitor.appendChild(stats.domElement);
	stats.domElement.id = "stats";
}

