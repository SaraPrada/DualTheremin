let osc, playing, freq, amp;
let numCircles = 1; // Numero di cerchi da disegnare
let diameter = 100; // Dimensione fissa del cerchio



async function setup() {
  createCanvas(windowWidth, windowHeight);
  //cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
  colorMode(HSB, 360, 100, 100);

  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  console.log("Carico modello...");
  detector = await createDetector();
  console.log("Modello caricato.");

}

async function draw() {
  //background(0)
// translate (200, 0)
//   scale(min(windowWidth/640, windowHeight/480))
  if (detector && capture.loadedmetadata) {
    const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true });

    for (let j = 0; j < hands.length; j++) {
      const hand = hands[j];
      const handedness = hand.handedness;
      // console.log(hand)

      if (hands.length >= 1) {
        const manoA = hands[0];
        const manoB = hands[1];

        // const mignolo = manoA.keypoints[20];
        // const anulare = manoA.keypoints[16];
        // const medio = manoA.keypoints[12];
        const indice = manoA.keypoints[8];
        const indiceA = manoA.keypoints[8];
        const indiceB = manoB.keypoints[8];
        // const pollice = manoA.keypoints[4];

		// Mappa la coordinata X del mouse (mouseX) alla frequenza (freq)
		freq = constrain(map(indice.x, 0, width, 100, 500), 100, 500);

		// Mappa la coordinata Y del mouse (mouseY) all'ampiezza (amp)
		amp = constrain(map(indice.y, height, 0, 0, 1), 0, 1);
        // Imposta il colore di riempimento con la sfumatura di blu
        let hue = map(indice.x, 0, width, 180, 255); // Sfumature di blu da 180 a 255
        let saturation = map(indice.y, 0, height, 100, 0); // Graduazione della saturazione
        let brightness = 100; // Luminosità massima
        let offset = 40;

        fill(hue, saturation, brightness);
        stroke(255);

        myXA = map(indiceA.x, 0,640,0,windowWidth)
        myYA = map(indiceA.y, 0,480,0,windowHeight)

        myXB = map(indiceB.x, 0,640,0,windowWidth)
        myYB = map(indiceB.y, 0,480,0,windowHeight)


        for (let i = 0; i < numCircles; i++) {
          ellipse(myXA + (offset * i), myYA + (offset * i), diameter);
        }

        fill(hue, saturation, 80);
        for (let i = 0; i < numCircles; i++) {
          rect(myXB + (offset * i), myYB + (offset * i), diameter);
        }

		fill(0);
  		text('tap to play', 20, 20);
  		text('freq: ' + freq, 20, 40);
  		text('amp: ' + amp, 20, 60);

  		if (playing) {
   		osc.freq(freq, 0.1);
    		osc.amp(amp, 0.1);
  		}
      }
    }
  }
}

function playOscillator() {
  osc.start();
  playing = true;
}

function mouseMoved() {
  if (!playing) {
    playOscillator();
  }
}

function mouseReleased() {
  osc.amp(0, 0.5);
  playing = false;
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
