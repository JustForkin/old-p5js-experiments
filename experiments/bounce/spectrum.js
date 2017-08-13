function preload() {
    // mySound = loadSound('38709__metamorphmuses__deep-bass-kick.wav');
    mySound = loadSound('priest-cut.mp3');
}


function getSpectrum() {
    var spectrum = fft.analyze();
    // peakDetect accepts an fft post-analysis
    peakDetect.update(fft);

    var i = h.getRandomInt(0, spectrum.length/10);
    var hwspectrum = spectrum[0] * h.getNegOrPos();

    return hwspectrum / 100;
}

function translateSpectrum() {
    var extrapunch = 0;

    // exaggerate the peak
    if ( peakDetect.isDetected ) {
        extrapunch = 250;
    }

    var translate = getSpectrum() + extrapunch;
    // console.log(translate);
    return translate;
}