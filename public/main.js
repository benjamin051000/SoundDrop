
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
function draw(){
  //If mic has been activated, run this shit
  if(mic){
    //Set the input of the fft to the microphone input
    fft.setInput(mic)
    //print(fft)
    background(200);

    //Get the fft data into a useable object
    let spectrum = fft.analyze();

    //console.log(fft.getEnergy(440) > 150)
    var frequencies = [5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450, 5500, 5550, 5600, 5650, 5700, 5750];
    var value =  { //5000 - 5050 works
    5000: '0',
    5050: '1',
    5100: '2',
    5150: '3',
    5200: '4',
    5250: '5',
    5300: '6',
    5350: '7',
    5400: '8',
    5450: '9',
    5500: 'A',
    5550: 'A',
    5600: 'C',
    5650: 'D',
    5700: 'E',
    5750: 'F'
  };
    //print(fft.getEnergy(5000) > 140)
    for(var v = 0; v < frequencies.length; v++){
      if(fft.getEnergy(frequencies[v]) > 110){
          //console.log(`Frequency ${frequencies[v]} energy ${fft.getEnergy(frequencies[v])}`)
          //console.log(frequencies[v])
          //print(value[frequencies[v]])

          if(frequencies[v] != current_frequency){
            offset_frequency += 1;
            current_frequency = frequencies[v];
            counter = 0
            //console.log("Reset counter")
            // if(offset_frequency > 40)
            // {
            //   //console.log("Offset triggered")
            //   counter = 0;
            //   offset_frequency = 0;
            //   //current_frequency = frequencies[v]
            // }
          }

          counter += 1
          //console.log(counter)
          if(counter >= 7){
            bitstr += value[frequencies[v]]
            console.log(bitstr);
            counter = 0
          }

    }
    }
    // if(fft.getEnergy(540) > 150){
    //   one_counter += 1
    // }
    // if(fft.getEnergy(440) > 150){
    //   zero_counter += 1
    // }
    // if(fft.getEnergy(440) < 150){
    //   zero_counter = 0
    // }
    // if(fft.getEnergy(540) < 150){
    //   one_counter = 0
    // }
    // if(one_counter > 50){
    //   console.log("1")
    //   one_counter = 0
    // }
    // if(zero_counter > 50){
    //   console.log("0")
    //   zero_counter = 0
    // }

    //Draw the fft
    beginShape();
    for (i = 0; i < spectrum.length; i++) {
      vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();


    //Information from the mic
    micLevel = mic.getLevel();
    //print(micLevel)
    //print(mic)
    ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}}


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
