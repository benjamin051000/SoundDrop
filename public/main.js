
let mic;
function setup(){
  mic = new p5.AudioIn()
  mic.start();
}
function draw(){
  background(0);
  micLevel = mic.getLevel();
  ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);
}

function takeInput()
{
    //Get input
    let input = document.getElementById("inputBox").value;
    let parsedInput = parseInt(input)


    //declare oscillator
    // osc = new p5.Oscillator();
    // osc.setType('sine');
    // osc.freq(440);
    // osc.amp(1);

    //Make signal based off input
    alert(parsedInput)

    if(parsedInput == 2)
    {
        //osc.start();
    }
}
