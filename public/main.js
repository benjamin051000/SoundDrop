function setup() {
    console.log("setting up p5...")
}
function draw() {

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

    if(parsedInput == 1)
    {
        //osc.start();
    }
}