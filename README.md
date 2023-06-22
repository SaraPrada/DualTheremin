SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 3: Manipolazione

# DualTheremin
Autore: Sara Prada
[MediaPipe demo-ES6](https://saraprada.github.io/DualTheremin/)

## Introduzione e tema
Il progetto si focalizza sulla creazione di un sistema di interfaccia innovativo che consente all'utente di interagire attraverso le proprie azione, utilizzando i propri gesti o la posizione delle mani, tramite la tecnologia di computer vision. Questo progetto in particolare è denominato "DualTheremin" e il macrotema è la musica e lo sviluppo di uno strumento musicale virtuale, il Theremin, ma con la possibilità di suonarlo attraverso due oscillatori contemporaneamente.  

## Riferimenti progettuali
Come riferimenti progettuali sono stati presi in considerazione due interfacce con caratteristiche diverse: una che privilegia la tipica interazione del Theremin e una che invece privilegia la grafica delle diverse onde sonore prodotte dal Theremin, così si è voluto unire queste due funzionalità e regalare un'esperienza sia sonora che visiva.

[Femurdesign](https://femurdesign.com/theremin) <br>
[Theremix](https://theremin.app/) 

Un'altro importante spunto del progetto è John Cage, un grande esponente della musica che ha sperimentato molto sia per quanto riguarda il suono che per la grafica e la composizione degli spartiti.

## Design dell’interfaccia e dell’interazione
Il design dell'interfaccia è pensato per dar spazio ed importanza all'esperienza visiva caratterizzata da 2 forme geometriche pure, il cerchio e il quadrato, entrambe duplicate 5 volte per ricordare il pentagramma di uno spartito, che si ricreano sul canvas in loop. La particolarità del progetto è che diversamente dall'interazione usuale del Theremin dove si utilizzano due mani distinte per controllare il pitch e il volume, qui, attraverso l'utilizzo dei due diti indici si controllano entrambi i valori sfruttando l'asse delle "X" e delle "Y". Il colore è stato studiato in base all'interazione dell'interfaccia e al suono. I due oscillatori, "Sine" e "Square", hanno due colori diversi, "Sine" il blu in quanto soggettivamente ha un suono più freddo e delicato, mentre al contrario, "Square" l'arancione in quanto ha un suono più pungente e caldo. L'asse delle "X" controlla il parametro delle note, e qui si trovano tinte dei due colori dove partendo da sinistra si trovano tinte più scure per collegarlo al suono più grave, mentre a destra ci sono tinte più chiare e brillanti per collegarle al suono più acuto. L'asse delle "Y" invece controlla il parametro dell'amplificazione quindi del volume delle note, al colore di partenza dell'asse delle "X" viene tolto gradualmente il valore della saturazione per collegarlo all'abbassamento regolare del volume.

## Tecnologia usata
Come punto di partenza il progetto è partito proprio dal suono, acquisito dalla libreria di sound di p5.js.

```JavaScript

//codice di partenza di p5.js
let osc, playing, freq, amp;

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {
  background(220)
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  text('tap to play', 20, 20);
  text('freq: ' + freq, 20, 40);
  text('amp: ' + amp, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}

```
Da qui il progetto ha preso la direzione di cercare quale potesse essere un'interazione nuova che potesse rendere migliore ed ancora più unica l'esperienza del Theremin: oltre alla rappresentazione visiva, la possibilità di poter suonare con due oscillatori differenti contemporaneamente è la parte centrale del codice.

```JavaScript

//codice per la parte visiva e grafica
        let hue = map(indiceA.x, 0, windowWidth / 1.2, 215, 155); // Sfumature di blu 
        let saturation = map(indiceA.y, 0, windowHeight / 1.2, 100, 0); // Graduazione della saturazione
        let hueB = map(indiceB.x, 0, windowWidth / 1.2, 20, 95); // Sfumature di arancione
        let saturationB = map(indiceB.y, 0, windowHeight / 1.2, 100, 0); // Graduazione della saturazione
        let brightness = 100; // Luminosità massima
        let offset = 40;


//cerchio
        fill(hue, saturation, brightness);
        stroke(hue + 5, saturation + 5 , brightness + 5);
        for (let i = 0; i < numCircles; i++) {
            i++;
          ellipse(myXA + (offset * i), myYA + (offset * i), diameter);
        }

//quadrato
        fill(hueB, saturationB, brightness);
        stroke(hueB + 5, saturationB + 5 , brightness + 5);
        for (let i = 0; i < numCircles; i++) {
          i++;
          rect(myXB + (offset * i), myYB + (offset * i), diameter);
        }

```
```JavaScript

//codice per l'assegnazione degli oscillatori
    let oscA, oscB; // Dichiarazione degli oscillatori
    let playingA = false, playingB = false; // Indicatori per il suono di oscA e oscB
    let freqA, ampA, freqB, ampB; // Frequenza e ampiezza per oscA e oscB

    async function setup() {
        oscA = new p5.Oscillator('sine');
        oscB = new p5.Oscillator('square');
        oscA.setType('sine');
        oscB.setType('square');

    async function draw() {
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

        if (handedness === "left") {
          isSquareSound = false; // Indice associato ai cerchi (suono sinusoidale)
        } else if (handedness === "right") {
          isSquareSound = true; // Indice associato ai quadrati (suono a onda quadrata)
        }

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

    function mouseReleased() {
        oscA.amp(0, 0.5);
        oscB.amp(0, 0.5);
        playingA = false;
        playingB = false;
    }


```




