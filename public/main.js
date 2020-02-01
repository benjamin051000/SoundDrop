let mic;
function setup(){
  createCanvas(710, 400);
  noFill();
  fft = new p5.FFT();
  let myDiv = createDiv('click to start audio');
    myDiv.position(0, 0);

  let mySynth = new p5.MonoSynth();

  // This won't play until the context has started
  mySynth.play('A6');

  // Start the audio context on a click/touch event
  userStartAudio().then(function() {
     myDiv.remove();
   });
}
var zero_counter = 0
var one_counter = 0
let current_frequency = 440
let counter = 0
let offset_frequency = 0
let bitstr = ""
let looking = false
let count = 0
function draw(){
  //If mic has been activated, run this shit
  if(mic){
    //Set the input of the fft to the microphone input
    fft.setInput(mic)
    //print(fft)
  //background(200);

    //Get the fft data into a useable object
    let spectrum = fft.analyze();

    //console.log(fft.getEnergy(440) > 150)
    var startFreq = 4000
    var endFreq = 4500
    var frequencies = [5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500];
    var value =  { //5000 - 5050 works
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

    if(fft.getEnergy(4000) > 150 && !looking){
      looking = true
    }

    if(looking && fft.getEnergy(4000) < 150){
      let maxEnergy = 0
      let idx = 0
      for(let i = 0; i<frequencies.length; i++){
        if(fft.getEnergy(frequencies[i]) > maxEnergy){
          maxEnergy = fft.getEnergy(frequencies[i])
          idx = i
        }
      }
      //print(idx)
      bitstr += value[frequencies[idx]]
      looking = false
    }
    console.log(bitstr)


    //Information from the mic
    micLevel = mic.getLevel();
    //print(micLevel)
    //print(mic)
    //ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
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
