let mic;
let bitstr;
// let lookForData; // true after start sound is played
let printed; 
let finished;
let threshold = 150; // Energy level threshold to consider signal as significant

// Tone delimiter
// let startFreq = 4000; 
// End of transmission
let endFreq = 4500;
let frequencies = [5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 
                  5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500];

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
  6500: 'F',
  4000: 'R' // Repeat marker.
  };


function startfft() {
    document.getElementById("listen-btn").value = "Reset";
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    bitstr = "";
    lookForData = false;
    printed = false;
    finished = false;
}

// Setup is called once by the p5 library.
function setup() {
  createCanvas(710, 400);
  noFill();
  // Start the audio context on a click/touch event so sound can be recorded
  // This is required to get microphone access.
  userStartAudio().then(()=>{
      console.log("Microphone enabled.");
  });
}

/* function updateSlider() { // This makes the listener fail for some reason.
  // Update threshold slider
  let slider = document.getElementById("Rx-thresh");
  let sliderVal = document.getElementById("thresh-val");
  sliderVal.innerHTML = slider.value;
  slider.oninput = () => {
    sliderVal.innerHTML = this.value;
  }
  // Update threshold in algorithm
  threshold = sliderVal;
} */

// Draw is called repeatedly by p5 until the script is finished executing.
function draw() {
  // updateSlider();

  if(mic && !finished) {
    // Set the input of the FFT to the microphone input
    fft.setInput(mic);

    // Parse and save FFT data
    let spectrum = fft.analyze();

    // Draw frequency spectrum in the canvas
    background(250);
    beginShape();
    stroke(0, 150, 255);
    for(let i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();

    // Get a sample of the energies (magnitudes) at the beginning and end marker frequencies.
    let //startEnergy = fft.getEnergy(startFreq),
        endEnergy = fft.getEnergy(endFreq);

    
    if(endEnergy > threshold){
      // If the end marker was heard, stop listening and reconstruct the data.
      finished = true;
    }
    else {
      // Listen for tones that match the preset frequencies to represent hex digits (defined by the frequencies variable)
      let idx = getDominantFreq(fft);
      bitstr += value[frequencies[idx]];
      lookForData = false;
    }
  }

  // Print out bitstr
  if (finished && !printed) {
    printed = true; // Ensures output is only printed once.
    // Convert all of the 'R' repeat markers to their repeated values.
    for(let i=1; i < bitstr.length; i++) {
      if(bitstr[i] == 'R') {
        // Replace it with the previous value.
        bitstr[i] = bitstr[i-1];
      }
    }
    
    let message = decodeRx(bitstr);
    console.log("Reconstructed message:", message);
    document.getElementById("recieved_msg").innerHTML = message;
  }
} // End of draw()

function getDominantFreq(fft) {
  // Returns the frequency with the largest energy (amplitude)
  let maxEnergy = 0, maxidx = 0;
  
  for(let i = 0; i < frequencies.length; i++){
    let energy = fft.getEnergy(frequencies[i]);
    if(energy > maxEnergy) {
      maxEnergy = energy;
      maxidx = i;
    }
  }
  return maxidx;
}

function decodeRx(rxPayload) {
  // Check for invalid input
  if(!rxPayload) {
    return "Error: Reset the listener and try again.";
  }

  // separate rxPayload into groups of 2 (TODO make this work for emoji which need 4)
  // This is a magical method from StackOverflow, no idea how it works
  let temp = rxPayload.match(/.{1,2}/g); 
  console.log("Hex characters:", temp);

  // Decodes a string of Hexadecimal characters.
  let output = "";
  for(let ch of temp) {
    output += String.fromCharCode(parseInt(ch, 16));
  }
  return output;
}