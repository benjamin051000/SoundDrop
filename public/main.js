let mic;
function setup(){
  //Create a canvas for the user to interact with (this can be any interaction)
  createCanvas(710, 400);
  noFill();
  let myDiv = createDiv('click to start audio');
    myDiv.position(0, 0);

  //Create a FFT for sound processing
  fft = new p5.FFT();

  // Start the audio context on a click/touch event so sound can be recorded
  userStartAudio().then(function() {
     myDiv.remove();
   });
}

let bitstr = ""
let looking = false
let printed = false
let finished = false
var startFreq = 4000
var endFreq = 4500
var threshold = 150
var frequencies = [5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500];
var value =  {
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
    fft.analyze();

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

    //Information from the mic
    micLevel = mic.getLevel();
}}

function GetDominantFreq(fft, freq){
  let maxEnergy = 0
  let idx = 0
  for(var i = 0; i<freq.length; i++){
    if(fft.getEnergy(freq[i]) > maxEnergy){
      maxEnergy = fft.getEnergy(freq[i])
      idx = i
    }
  }
  return idx
}

function takeInput()
{
    //Get input
    let input = document.getElementById("inputBox").value;
    let parsedInput = parseInt(input)
    //Make signal based off input
    //alert(parsedInput)
    mic = new p5.AudioIn()
    mic.start()

    if(parsedInput == 2)
    {
        //osc.start();
    }
}
