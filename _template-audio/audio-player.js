// todo: create 1 object for player

var currentSong = 0;
var sound, thisSong;
var songLoaded = false;
var fft = new p5.FFT();
var fbass, fmid,
    bassDetect, midDetect;
var volume = .7;

// todo: seperate in json file and import
var songs = [
            {
                filename: 'Kardinal-coma(The Advent and industrialyzer remix).mp3',
                fbass: { x1:0, x2:50, t: 0.9},
                fmid: { x1:80, x2:120, t: 0.9}
            },
            {
                filename: 'Nanotek - plurial mute.mp3',
                fbass: { x1:0, x2:70, t: 0.9},
                fmid: { x1: 90, x2:120, t: 0.9},
                fhi: { x1: 150, x2:180, t: 0.9}
            },
            {
                filename: 'nanotek - ashes.mp3',
                fbass: { x1:0, x2:60, t: 0.7},
                fmid: { x1:120, x2:180, t: 1}
            }
            ];

var allSounds = [];

/*
    preload Sound
*/
function preloadSong(song) {
    console.log('preloading song: ' + currentSong);

    if (allSounds[currentSong]) {
        console.log('same song');
        sound = allSounds[currentSong];
        sound.setVolume(volume);
        sound.play();
        return;
    }

    allSounds[song] = sound = new p5.SoundFile('songs/' + song.filename,
        onMusicLoaded,
        h.onError
    );    

    // The volume is reset (to 1) when a new song is loaded. so we force it 
    sound.setVolume(volume);
}

/*
    play random song
    fires on 'onended'
*/
function newSong() {
    var randomSong = h.getRandomInt(0, songs.length-1);
    
    preloadSong(songs[currentSong]);
    if (currentSong < songs.length-1) {
        currentSong++;
    } else {
        currentSong=0;
    }

    // let's set the parameters for bass and mid detection
    thisSong = songs[currentSong];

    fbassMin = controls.fBassMin;
    fbassMax = controls.fBassMax;
    fMidMin = controls.fMidMin;
    fMidMax = controls.fMidMax;
    bth = controls.bth;
    mth = controls.mth;

    bassDetect = new p5.PeakDetect(fbassMin, fbassMax, bth);
    midDetect = new p5.PeakDetect(fMidMin, fMidMax, mth);
}

function getSpectrum() {
    this.init = function() {
        // first analyze
        fft.analyze();
        // then detect
        bassDetect.update(fft);
        midDetect.update(fft);
    }

    this.bass = function() {
        return bassDetect.isDetected;
    }

    this.mid = function() {
        return midDetect.isDetected;
    }
}

function onMusicLoaded() {
    // $loader.addClass('hidden');
    songLoaded = true;
    sound.play();
}

newSong();