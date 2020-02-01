function setup() {}
function draw() {}

function playSound() {
  // Pull data from form field
  let form = document.getElementById('inputBox').value;
  // Separates individual digits into an array.
  let values = form.split('');//.map((t) => {return parseInt(t)});
  console.log(values);

  // TODO Convert numbers into cooresponding frequencies using dict
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
  }; //etc. TODO Use a function to do this

  // Play each sound
  const playTime = 1;
  for (let j = 0; j < values.length; j++)
  {   
    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freqs[values[j]]);
    osc.amp(1);
    osc.start(j);
    osc.stop(j+playTime);
  }
}