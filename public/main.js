
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
    var frequencies = [440, 540]
    var value = {440: 0, 540: 1}
    for(var v = 0; v < frequencies.length; v++){
      if(fft.getEnergy(frequencies[v]) > 150){
          //console.log(`Frequency ${frequencies[v]} energy ${fft.getEnergy(frequencies[v])}`)
          if(frequencies[v] != current_frequency){
            offset_frequency += 1;
            current_frequency = frequencies[v];
            if(offset_frequency > 40)
            {
              console.log("Offset triggered")
              counter = 0;
              offset_frequency = 0;
              //current_frequency = frequencies[v]
            }
          }

          counter += 1
          //console.log(counter)
          if(counter >= 55){
            console.log(value[frequencies[v]]);
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
