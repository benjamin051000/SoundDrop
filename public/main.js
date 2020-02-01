let txPayload;

function setup() {
  uploadFile();
}

function draw() {}

function playSound() {
  let freqs = {
    '0': 440,
    '1': 540,
    '2': 640,
    '3': 740,
    '4': 840,
    '5': 940,
    '6': 1040,
    '7': 1140,
    '8': 1240,
    '9': 1340,
    'A': 1440,
    'B': 1540,
    'C': 1640,
    'D': 1740,
    'E': 1840,
    'F': 1940
  }; // TODO Use a function to do this?

  // Play each sound
  const playTime = 1;
  let osc;
  for (let j=0; j < txPayload.length; j++)
  {   
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freqs[txPayload[j]]);
    osc.amp(1);
    osc.start(j);
    osc.stop(j+playTime);
  }
}

function uploadFile() {
  fileinput = createFileInput(handleFile);
  fileinput.position(0,50);
}

function handleFile(file) {
  // data is the binary representation of unicode characters in the file.
  const data = file.data;

  // Convert to binary
  let bin = "";
  for(let i=0; i < data.length; i++) {
    bin += data[i].charCodeAt(0).toString(2);
  }

  // Convert bin to hexadecimal
  let hex = parseInt(bin, 2).toString(16).toUpperCase();
  
  // Put this data into the transmisison payload as individual elements.
  // txPayload = hex.split("");
}
