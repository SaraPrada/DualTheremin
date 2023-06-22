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




