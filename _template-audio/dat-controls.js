/*
	DAT GUI
*/
var stats = new Stats();

var controls = new function() {
     this.fBassMin = 0;
     this.fBassMax = 120;
     this.bassTreshold = .2;
     this.fMidMin = 80;
     this.fMidMax = 120;
     this.midTreshold = .7;
}

window.onload = function() {
	var gui = new dat.GUI();
	gui.add(controls, 'fBassMin', 0, 50);
	gui.add(controls, 'fBassMax', 50, 90);
	gui.add(controls, 'bassTreshold', 0.5, 1);
	gui.add(controls, 'fMidMin', 80, 120);
	gui.add(controls, 'fMidMax', 100, 150);
	gui.add(controls, 'midTreshold', 0.5, 1);

	gui.remember(controls);

	//STATS
	var fpsMonitor = document.getElementById('fps-monitor');
	fpsMonitor.appendChild(stats.domElement);
	stats.domElement.id = "stats";
}
