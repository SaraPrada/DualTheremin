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
Il design dell'interfaccia è pensato per dar spazio ed importanza all'esperienza visiva caratterizzata da 2 forme geometriche pure, il cerchio e il quadrato, entrambe duplicate 5 volte per ricordare il pentagramma di uno spartito, che si ricreano sul canvas in loop. La particolarità del progetto è che diversamente dall'interazione usuale del Theremin dove si utilizzano due mani distinte per controllare il pitch e il volume, qui, attraverso l'utilizzo del dito indice si controllano entrambi i valori sfruttando l'asse delle "X" e delle "Y". Il colore è stato studiato in base all'interazione dell'interfaccia e al suono. I due oscillatori, Sine e Square, hanno due colori diversi, Sine il blu in quanto soggettivamente ha un suono più freddo e delicato, mentre al contrario, Square l'arancione in quanto ha un suono più pungente e caldo. L'asse delle "X" controlla il parametro delle note, e qui si trovano tinte dei due colori dove partendo da sinistra si trovano tinte più scure per collegarlo al suono più grave, mentre a destra ci sono tinte più chiare e brillanti per collegarle al suono più acuto. L'asse delle "Y" invece controlla il parametro dell'amplificazione quindi del volume delle note, al colore di partenza dell'asse delle "X" viene tolto gradualmente il valore della saturazione per collegarlo all'abbassamento regolare del volume.

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
Un’altra caratteristica è la funzione
random che è stata impiegata per le bolle: cambiano la loro posizione ogni volta che la pagina viene ricaricata.

```JavaScript
    for(let x = 0; x<= n_bolle; x++) {
		posx = random(width)
		posy = random(height)

		bolle.push(posx,posy)
		console.log(posx,posy)

	}
	console.log(bolle)


	for(let x = 0; x<= bolle.length; x++) {
		movex = bolle[x] 
		movey = bolle[x + 1] 
		fill (187, 241, 255)
		ellipse (movex, bolle[x + 1], 20, 20)
		fill (255)
		ellipse(movex + 5, bolle[x + 1] + 5, 5, 5)
	}
```




