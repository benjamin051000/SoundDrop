
let mic;
function setup(){
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
function draw(){
  if(mic){
    //let mySynth = new p5.MonoSynth();
    //mySynth.play('A6')
    fft.setInput(mic)
    print(fft)
    background(0);
    micLevel = mic.getLevel();
    print(micLevel)
    print(mic)
    ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}}


function takeInput()
{
    //Get input
    let input = document.getElementById("inputBox").value;
    let parsedInput = parseInt(input)
    //Make signal based off input
    alert(parsedInput)
    mic = new p5.AudioIn()
    mic.start()

    if(parsedInput == 2)
    {
        //osc.start();
    }
}
