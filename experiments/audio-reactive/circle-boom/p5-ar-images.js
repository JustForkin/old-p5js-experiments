var song;

function preload(){
    // song = loadSound('priest.mp3');
    sound = new p5.SoundFile('priest.mp3',
        init,
        onError,
        musicLoading
    );

    sound.setVolume(0.3);
}

function init() {
    var play = document.querySelector('.play');
    play.addEventListener('click', function(event) {
        togglePlay();
        loop();
    }, false);

    var stoploop = document.querySelector('.stoploop');
    stoploop.addEventListener('click', function(event) {
        noLoop();
    }, false);

    setup();
}

function onError(error) {
    console.log(error);
}

function musicLoading(perc) {
    console.log(perc);

    var loader = document.querySelector('.loader'),
        bar = document.querySelector('.loading-bar'),
        perc = perc * 100;

    //todo increase width of bar while
    //todo onfinish remove loader
}

var amplitude = new p5.Amplitude();
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}

/*
 helpers
*/

var h = {
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};


/*
 canvas
*/

function setup() {
    setupCanvas();
    fft = new p5.FFT();
    frameRate(24);
}

function setupCanvas() {
    // console.log(width, height);
    // createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(750, 750);
}

function draw() {
    centerX = width/2;
    centerY = height/2;

    var level = amplitude.getLevel();
    var spectrum = fft.analyze();
    var waveform = fft.waveform();
    var colors = ['#D098A5', '#DB9FA9', '#EBEDFA', '#9DAEB5', '#191B34'];

    function drawEllipses () {
        var i = h.getRandomInt(0,spectrum.length/2);
        var hwspectrum = spectrum[i] * 5;

        var hwlevel = level * 800;
        var x1 = centerX;
        var y1 = centerY;
        // var x2 = h.getRandomInt(75, 225) + centerX;
        // var y2 = h.getRandomInt(15, 125) + centerY;
        // var hw = 20 * h.getRandomInt(5,20);
        var c = h.getRandomInt(0, 4);
        stroke(colors[c]);
        fill(colors[c]);
        console.log(x1, y1, hwspectrum, hwlevel);
        ellipse(x1, y1, hwspectrum, hwspectrum);
        // ellipse(x1, y1, hwlevel, hwlevel);
    }

    setInterval(function() {
        clear();
    },2000)

    // console.log(sound.isPlaying());
    if (sound.isPlaying()) {
        drawEllipses();
    }

    /*
        todo: teken object
        todo: verander object door waardes uit spectrum of waveform
        todo: creeer particle system adhv waardes
        todo: creeer interactie met muis
    */

    // console.log('level ' + level);
    // console.log(spectrum);
    // console.log(waveform);

}
