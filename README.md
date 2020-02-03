# SoundDrop
SoundDrop is a sound-based file sharing platform. This is a proof of concept developed by John Shoemaker, Joshua Haddad, and Benjamin Wheeler for [SwampHacks 2020](https://2020.swamphacks.com/) at the University of Florida (in less than 24 hours). It won second place overall at the hackathon.

## How to Run
1. Clone the repository using `git clone https://github.com/benjamin051000/SoundDrop.git`.
2. Run `./start.sh` in your terminal or console to download the required packages and run the server.
3. The server defaults to `localhost:3000`. Enter this in your web-browser of choice to use the application.

## Using SoundDrop
The application greets you with a simple page. The two primary functions of the webpage are to send and recieve data. Under **Transmit Data**, you can type a message into the form box labeled "Send a message" and it will transmit over your speakers to nearby devices.

To recieve a message being sent on another device, simply press the "Listen" button in the **Recieve Data** section (Be sure to press "Listen" *before* sending the sound). This will display a frequency spectrum below, and will display the message after it is sent. If the message is not transferred properly, press the "Reset" button and send the message again.

# Inspiration/Technical Details
SoundDrop is inspired by the popular Apple AirDrop service, which allows iOS and macOS devices to share files directly without any middleman over Wi-Fi and Bluetooth. SoundDrop is a proof of concept of a cross-platform file-sharing application that uses sound waves to transmit information.

The application utilizes the [Fast Fourier Transform (FFT) algorithm](https://en.wikipedia.org/wiki/Fast_Fourier_transform) to process incoming sound waves and determine their frequencies. The sending algorithm translates the message into hexadecimal notation. Each hex number has its own cooresponding frequency. These frequencies are generated with the [p5.js library](https://p5js.org/) (as well as FFT implementation and Frequency Spectrum graphing).

When the secondary device hears the frequencies through its microphone, it uses the FFT algorithm to determine the frequencies of what it hears. When it hears a frequency it recognizes to be a piece of data sent via the application, it records it. Once the message is sent, it translates the hex back into human-readable text.

SoundDrop was created as a recreational project for the SwampHacks 2020 Hackathon at the University of Florida. Go Gators!
