// function setup() {}
// function draw() {}

function playSound() {
  // Grab message in form
  const formInput = document.getElementById('inputTx').value;

  // Encode the message into hexadecimal
  const values = encodeTxArray(formInput.split(''));

  // Each tone and its cooresponding frequency.
  // begin and end are markers and not used when
  // reconstructing message.
  const freqs = { 
    '0': 5000,
    '1': 5100,
    '2': 5200,
    '3': 5300,
    '4': 5400,
    '5': 5500,
    '6': 5600,
    '7': 5700,
    '8': 5800,
    '9': 5900,
    'A': 6000,
    'B': 6100,
    'C': 6200,
    'D': 6300,
    'E': 6400,
    'F': 6500,
    'begin': 4000, //freq to be played before each sound
    'end': 4500, //end freq
  };
  
  // Speed at which tones are produced (lower is faster)
  const playTime = 1/2;
  
  // For each bit, play a beginning marker and its tone.
  for (let j = 0; j < values.length; j++)
  {    
    // play beginning marker
    let startOsc = new p5.Oscillator();
    startOsc.setType('sine');
    startOsc.freq(freqs['begin']);
    startOsc.amp(1);
    startOsc.start(j*playTime);
    startOsc.stop(j*playTime+playTime/2);

    // Play data tone
    let dataOsc = new p5.Oscillator();
    dataOsc.setType('sine');
    dataOsc.freq(freqs[values[j]]);
    dataOsc.amp(1);
    dataOsc.start(j*playTime+playTime/2);
    dataOsc.stop(j*playTime+playTime);
  }

  // Play end tone 
  let endOsc = new p5.Oscillator();
  endOsc.setType('sine');
  endOsc.freq(freqs['end']);
  endOsc.amp(1);
  endOsc.start(values.length*playTime);
  endOsc.stop(values.length*playTime+1/4);
}

function encodeTxArray(txPayload) {
  /* Input a string array, output hex char array. */
  
  let hex = [];
  // Convert each element to hexadecimal
  for(let e of txPayload) {
    hex.push(e.charCodeAt(0).toString(16).toUpperCase());
  }
  console.log("Input converted to", hex);
  
  // Now, split elements to one character each
  let output = [];
  for(let e of hex) {
    let temp = e.split("");
    for(let t of temp) {
      output.push(t);
    }
  }
  console.log(output);
  return output;
}