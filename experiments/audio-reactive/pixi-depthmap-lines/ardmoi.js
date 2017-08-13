// TODO: MOUSE INTERACTION
// TODO: DISPLACEMENT RESET
/*
 helpers
*/
var h = {
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getNegOrPos : function() {
        var n;
        if (Math.random() > 0.5){
            n = -1;
        } else {
            n = 1;
        }
        return n;
    },
    onError: function(error) {
        console.log('error');
        console.log(error);
    }
};

//init variables
var $btnPlay = $('.play');
var $loader = $('.loader');
var fft = new p5.FFT();
var peakDetect = new p5.PeakDetect();
var hwspectrum = 0;
var displacementModifier = 5;
var xModifier = 2.5;
var yModifier = 1.5;

// preload Sound
function preload(){
    sound = new p5.SoundFile('priest-cut.mp3',
        onMusicLoaded,
        h.onError
    );

    // sound.setVolume(0.3);
}

//change volume on scroll
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop(),
        windowHeight = $(window).height(),
        volume = 1 - (scrollTop / windowHeight);
    sound.setVolume(volume);

    // scroll on blur.
    // var blur = 32 - (scrollTop / windowHeight * 50);
    // console.log(blur);
    // blurFilter.blur(20); --> WTF WHY NO WORK
});

//when sound is loaded
function onMusicLoaded() {
    $btnPlay.removeClass('hidden');
    $loader.addClass('hidden');

    $btnPlay.on('click', function(e) {
        e.preventDefault();
        console.log('play');
        togglePlay();
        $btnPlay.addClass('hidden');
    });

    initPixiContainer();
}

// start and stop playing
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

/*
    get spectrum of sound and translate to useful coordinates
*/
function getSpectrum() {
    var spectrum = fft.analyze();
    // peakDetect accepts an fft post-analysis
    peakDetect.update(fft);
    var si = h.getRandomInt(0, spectrum.length/10);
    var hwspectrum = spectrum[si] * displacementModifier;

    return hwspectrum;
}

function translateSpectrum() {
    var extrapunch = 0;
    if ( peakDetect.isDetected ) {
        extrapunch = 250;
    }

    var translate = (getSpectrum()/100) * h.getNegOrPos() + extrapunch;
    // console.log(translate);
    return translate;
}


/*
    initialise the canvas
*/
function initPixiContainer() {
    console.log('initPixiContainer');
    stage = new PIXI.Container();

    renderer = new PIXI.autoDetectRenderer(
        window.innerWidth, 
        .90 * window.innerHeight,
        {view:document.getElementById('canvas')}
    );

    //filters
    var displacementTexture = PIXI.Sprite.fromImage('displacement_map5.jpg');
    displacementFilter = new PIXI.filters.DisplacementFilter(displacementTexture);
    blurFilter = new PIXI.filters.BlurXFilter();

    // displacementTexture.x = .5;
    // displacementTexture.y = .5;
    //TODO: create array of sprites and randomly change on interval or onended
    var mb = new PIXI.Sprite.fromImage('intro3.jpg');
    mb.position.x = 0;
    mb.position.y = 0;
    stage.addChild(mb);
    
    // add filters
    mb.filters = [displacementFilter];

    //animate
    requestAnimationFrame(animate);
}

/*
    animate that shit jo
*/
function animate() {
    displacementFilter.scale.x += translateSpectrum();
    displacementFilter.scale.y += translateSpectrum();
    renderer.render(stage);
    requestAnimationFrame(animate);
}

//start preloading
preload();



