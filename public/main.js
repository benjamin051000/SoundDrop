function setup() {}
function draw() {}

function playSound() {
  // Pull data from form field
  let form = document.getElementById('inputBox').value;
  // Separates individual digits into an array.
  let values = form.split('');//.map((t) => {return parseInt(t)});
  console.log(values);

  // TODO Convert numbers into cooresponding frequencies using dict
  let freqs = { //5000 - 5050 works
    '0': 5000,
    '1': 5050,
    '2': 5100,
    '3': 5150,
    '4': 5200,
    '5': 5250,
    '6': 5300,
    '7': 5350,
    '8': 5400,
    '9': 5450,
    'A': 5500,
    'B': 5550,
    'C': 5600,
    'D': 5650,
    'E': 5700,
    'F': 5750
  }; //etc. TODO Use a function to do this

  // Play each sound
  const playTime = 1/8;
  for (let j = 0; j < values.length; j++)
  {   
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freqs[values[j]]);
    osc.amp(1);
    osc.start(j*playTime);
    osc.stop(j*playTime+playTime/2);
  }
}