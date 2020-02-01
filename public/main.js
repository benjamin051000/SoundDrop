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

    //Make signal based off input
    alert(parsedInput)
}