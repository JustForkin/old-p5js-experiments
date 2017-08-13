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
var btnPlay = document.querySelector('.play');
var loader = document.querySelector('.loader');
var fft = new p5.FFT();
var hwspectrum = 0;
var displacementModifier = 25;
var xModifier = 2.5;
var yModifier = 1.5;

// preload Sound
function preload(){
    sound = new p5.SoundFile('priest-cut.mp3',
        onMusicLoaded,
        h.onError
    );


    sound.setVolume(0.3);
}

//when sound is loaded
function onMusicLoaded() {
    btnPlay.classList.remove('hidden');
    loader.classList.add('hidden');
    btnPlay.addEventListener('click', function(event) {
        togglePlay();
        this.classList.add('hidden');
    }, false);

    initPixiContainer();
}

// start and stop playing
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}

/*
    get spectrum of sound and translate to useful coordinates
*/
function getSpectrum() {
    var spectrum = fft.analyze();
    var si = h.getRandomInt(0, spectrum.length/10);
    var hwspectrum = spectrum[si] * displacementModifier;
    // console.log(si);
    // console.log(hwspectrum);
    return hwspectrum;
}

function translateSpectrum() {
    var translate = (getSpectrum()/100) * h.getNegOrPos();
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
        {view:document.getElementById("canvas")}
    );
    renderer.view.style.backgroundColor= 'pink';
    //add displacement filter
    var displacementTexture = PIXI.Sprite.fromImage('displacement_map.jpg');
    displacementFilter = new PIXI.filters.DisplacementFilter(displacementTexture);

    //add BG motherboard
    //TODO: create array of sprites and randomly change on interval or onended
    var mb = new PIXI.Sprite.fromImage('intro3.jpg');
    mb.position.x = 0;
    mb.position.y = 0;
    stage.addChild(mb);
    // add filter    
    mb.filters = [displacementFilter];

    //animate
    requestAnimationFrame(animate);
}

/*
    animate that GL jo
*/
function animate() {
    displacementFilter.scale.x += translateSpectrum();
    displacementFilter.scale.y += translateSpectrum();
    
    renderer.render(stage);
    requestAnimationFrame(animate);
}

preload();