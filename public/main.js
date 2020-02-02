
function setup() {
  // uploadFile();
}

function draw() {}

function playSound() {

  // Pull tx from form field
  let formInput = document.getElementById('inputTx').value;

  // Encode the sentence into hexadecimal
  let values = encodeTxArray(formInput.split(''));

  let freqs = { 
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
    'Y': 4000, //freq to be played before each sound
    'Z': 4500, //end freq
  };
  
  // Play each sound
  const playTime = 1/2;
  for (let j = 0; j < values.length; j++)
  {    
    //play beginning tone
    startOsc = new p5.Oscillator();
    startOsc.setType('sine');
    startOsc.freq(freqs['Y']);
    startOsc.amp(1);
    startOsc.start(j*playTime);
    startOsc.stop(j*playTime+playTime/2);

    //play data tone

    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freqs[values[j]]);
    osc.amp(1);
    osc.start(j*playTime+playTime/2);
    osc.stop(j*playTime+playTime);
  }


  //play end tone 
  endOsc = new p5.Oscillator();
  endOsc.setType('sine');
  endOsc.freq(freqs['Z']);
  endOsc.amp(1);
  endOsc.start(values.length*playTime);
  endOsc.stop(values.length*playTime+1/4);
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
  txPayload = hex;
}

function encodeTxArray(txPayload) {
  /* Input a string array, output hex char array. */
  
  let hex = [];
  // Convert each element to binary, and then to hexadecimal
  for(let e of txPayload) {
    hex.push(e.charCodeAt(0).toString(16).toUpperCase());
  }
  console.log("Input converted to", hex);
  
  // Now, split elements to 1 char each
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

function decodeRx(rxPayload) {
  // Decodes a string of Hexadecimal characters.
  let output = "";
  for(let ch of rxPayload) {
    output += String.fromCharCode(ch);
  }
  print(output);
  return output;
}
