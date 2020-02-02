let mic;

function startfft() {
    mic = new p5.AudioIn();
    mic.start();
    createCanvas(710, 400);
    noFill();
    fft = new p5.FFT();
}

function setup() {
  // Start the audio context on a click/touch event so sound can be recorded
  userStartAudio().then(()=>{
      console.log("Microphone enabled.");
  });
}

let bitstr = ""
let looking = false // true after start sound is played
let printed = false 
let finished = false
let threshold = 150 // Energy level threshold to consider signal as significant

let startFreq = 4000 // Freq of start sound
let endFreq = 4500 // Freq of end sound
let frequencies = [5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500]; // Used to look for freqs

let value =  { // Used for print formatting only
5000: '0',
5100: '1',
5200: '2',
5300: '3',
5400: '4',
5500: '5',
5600: '6',
5700: '7',
5800: '8',
5900: '9',
6000: 'A',
6100: 'B',
6200: 'C',
6300: 'D',
6400: 'E',
6500: 'F'
};

function draw(){
  //If mic has been activated, run this shit
  if(mic){
    //Set the input of the fft to the microphone input
    fft.setInput(mic)

    //Parse and analyze fft data
    let spectrum = fft.analyze();

    // Draw the fft in the canvas
    background(250);
    beginShape();
    for(let i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();

    if(fft.getEnergy(startFreq) > threshold && !looking){
      looking = true
    }

    if(fft.getEnergy(endFreq) > threshold){
      finished = true
      return
    }

    if(looking && fft.getEnergy(4000) < threshold){
      let maxEnergy = 0
      let idx = GetDominantFreq(fft, frequencies)
      bitstr += value[frequencies[idx]]
      looking = false
    }
    if(finished && !printed){
      console.log(bitstr)
      printed = true
    }

    // Information from the mic
    micLevel = mic.getLevel();
}}

function GetDominantFreq(fft, freq) {
  // Returns the frequency with the largest energy (amplitude)
  let maxEnergy = 0;
  let maxidx = 0;
  for(let i=0; i < freq.length; i++){
    if(fft.getEnergy(freq[i]) > maxEnergy){
      maxEnergy = fft.getEnergy(freq[i]);
      maxidx = i;
    }
  }
  return maxidx;
}
