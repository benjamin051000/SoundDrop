let mic;
let bitstr;
let looking; // true after start sound is played
let printed; 
let finished;
let threshold = 150; // Energy level threshold to consider signal as significant

// Tone delimiter
let startFreq = 4000; 
// End of transmission
let endFreq = 4500;
let frequencies = [5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500];

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


function startfft() {
    document.getElementById("listen-btn").value = "Reset";
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    bitstr = "";
    looking = false;
    printed = false;
    finished = false;
}

function setup() {
  createCanvas(710, 400);
  noFill();
  // Start the audio context on a click/touch event so sound can be recorded
  userStartAudio().then(()=>{
      console.log("Microphone enabled.");
  });
}

function updateSlider() {
  // Update threshold slider
  let slider = document.getElementById("Rx-thresh");
  let sliderVal = document.getElementById("thresh-val");
  sliderVal.innerHTML = slider.value;
  slider.oninput = () => {
    sliderVal.innerHTML = this.value;
  }
  // Update threshold in algorithm
  threshold = sliderVal;
}

function draw(){
  // updateSlider();

  //If mic has been activated, run this shit
  if(mic && !finished) {
    //Set the input of the fft to the microphone input
    fft.setInput(mic)

    //Parse and analyze fft data
    let spectrum = fft.analyze();

    // Draw the fft in the canvas
    background(250);
    beginShape();
    stroke(0, 150, 255);
    for(let i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();

    let startEnergy = fft.getEnergy(startFreq);
    let endEnergy = fft.getEnergy(endFreq);

    // Look for the start frequency.
    if(startEnergy > threshold && !looking){
      looking = true;
    }

    // Look for end frequency
    if(endEnergy > threshold){
      finished = true;
      if(!printed) {
        console.log(bitstr);
        printed = true;
      }
      return;
    }

    if(looking && startEnergy < threshold && endEnergy < threshold) {
      let maxEnergy = 0;
      let idx = GetDominantFreq(fft, frequencies);
      bitstr += value[frequencies[idx]];
      looking = false;
    }
  }
  //Print out bitstr
  if (finished) {
    let message = decodeRx(bitstr);
    console.log("Recieved message:", message);
    document.getElementById("recieved_msg").innerHTML = message;
  }
}

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

function decodeRx(rxPayload) {
  // separate rxPayload into groups of 2 (thanks StackOverflow)
  let temp = rxPayload.match(/.{1,2}/g);
  console.log("Hex characters:", temp);

  console.log(temp);
  // Decodes a string of Hexadecimal characters.
  let output = "";
  for(let ch of temp) {
    output += String.fromCharCode(parseInt(ch, 16));
  }
  return output;
}