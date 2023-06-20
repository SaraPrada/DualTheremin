let osc, playing, freq, amp;
let numCircles = 10; // Numero di cerchi da disegnare
let diameter = 100; // Dimensione fissa del cerchio
let isSquareSound = false;
let i = 0;
let oscA, oscB; // Dichiarazione degli oscillatori
let playingA = false, playingB = false; // Indicatori per il suono di oscA e oscB
let freqA, ampA, freqB, ampB; // Frequenza e ampiezza per oscA e oscB






async function setup() {
  createCanvas(windowWidth, windowHeight);
  oscA = new p5.Oscillator('sine');
  oscB = new p5.Oscillator('square');
  oscA.setType('sine');
  oscB.setType('square');
  colorMode(HSB, 360, 100, 100);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  console.log("Carico modello...");
  detector = await createDetector();
  console.log("Modello caricato.");
}

async function draw() {
  if (detector && capture.loadedmetadata) {
    const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true });
    
    fill(0);
    noStroke()
    textSize(13)
      text('Plays with index fingers', 20, 20);
      text('Osc. Sine ', 20, 40);
      text('Osc. Square', 20, 60);
      textSize(20)
      text('+', 1750, 20);
      text('-', 1755, 1000);
      stroke(0)
      line(1757, 40, 1757, 970);


    for (let j = 0; j < hands.length; j++) {
      const hand = hands[j];
      const handedness = hand.handedness;


      if (playingA) {
        oscA.freq(freqA, 0.1);
        oscA.amp(ampA, 0.1);
      } else {
        oscA.amp(0, 0.1);
      }
      
      if (playingB) {
        oscB.freq(freqB, 0.1);
        oscB.amp(ampB, 0.1);
      } else {
        oscB.amp(0, 0.1);
      }
      
      

      if (hands.length >= 1) {
        const manoA = hands[0];
        const manoB = hands[1];
        const indiceA = manoA.keypoints[8];
        const indiceB = manoB.keypoints[8];

        if (handedness === "left") {
          isSquareSound = false; // Indice associato ai cerchi (suono sinusoidale)
        } else if (handedness === "right") {
          isSquareSound = true; // Indice associato ai quadrati (suono a onda quadrata)
        }

        freqA = map(indiceA.x, 0, windowWidth / 2, 100, 800); // Mappa la coordinata X dell'indice A sulla frequenza
        ampA = map(indiceA.y, windowHeight  / 2.15, 0, 0, 1); // Mappa la coordinata Y dell'indice A sull'ampiezza

        freqB = map(indiceB.x, 0, windowWidth / 2, 100, 800); // Mappa la coordinata X dell'indice B sulla frequenza
        ampB = map(indiceB.y, windowHeight  / 2.15, 0, 0, 1); // Mappa la coordinata Y dell'indice B sull'ampiezza

        // Imposta il colore di riempimento con la sfumatura di blu
        let hue = map(indiceA.x, 0, windowWidth / 1.2, 215, 155); // Sfumature di blu da 180 a 255
        let saturation = map(indiceA.y, 0, windowHeight / 1.2, 100, 0); // Graduazione della saturazione
        let hueB = map(indiceB.x, 0, windowWidth / 1.2, 20, 95); // Sfumature di blu da 180 a 255
        let saturationB = map(indiceB.y, 0, windowHeight / 1.2, 100, 0); // Graduazione della saturazione
        let brightness = 100; // Luminosità massima
        let offset = 40;

        fill(hue, saturation, brightness);
        stroke(hue + 5, saturation + 5 , brightness + 5);

        console.log("Canvas width:", windowWidth);
        console.log("Canvas height:", windowHeight);


        myXA = map(indiceA.x, 0,640,0,windowWidth)
        myYA = map(indiceA.y, 0,480,0,windowHeight)

        myXB = map(indiceB.x, 0,640,0,windowWidth)
        myYB = map(indiceB.y, 0,480,0,windowHeight)


        for (let i = 0; i < numCircles; i++) {
          i++;
          ellipse(myXA + (offset * i), myYA + (offset * i), diameter);
          if (isSquareSound) {
            playOscillatorB(); // Suono a onda quadrata (oscB)
          } else {
            playOscillatorA(); // Suono sinusoidale (oscA)
          }
        }

        fill(hueB, saturationB, brightness);
        stroke(hueB + 5, saturationB + 5 , brightness + 5);
        for (let i = 0; i < numCircles; i++) {
          i++;
          rect(myXB + (offset * i), myYB + (offset * i), diameter);
          if (isSquareSound) {
            playOscillatorA(); // Suono a onda quadrata (oscA)
          } else {
            playOscillatorB(); // Suono sinusoidale (oscB)
          }
        }



  		if (playing) {
   		osc.freq(freq, 0.1);
    		osc.amp(amp, 0.1);
  		}
      }
    }
  }
}

function playOscillatorA() {
  if (!playingA) {
    oscA.start();
    playingA = true;
  }
}

function playOscillatorB() {
  if (!playingB) {
    oscB.start();
    playingB = true;
  }
}


//function mouseMoved() {
  //if (!playingA && isSquareSound === true) {
  //  playOscillatorA();
 // }

 // if (!playingB && isSquareSound === false) {
 //   playOscillatorB();
 // }
//}




function mouseReleased() {
  oscA.amp(0, 0.5);
  oscB.amp(0, 0.5);
  playingA = false;
  playingB = false;
}

  


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

async function createDetector() {
  const mediaPipeConfig = {
    runtime: "mediapipe",
    modelType: "full",
    maxHands: 2,
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
  }
  return window.handPoseDetection.createDetector(window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig);
}
