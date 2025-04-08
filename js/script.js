//aspetto che la pagina si carica tutta e dopo parte la funzione
document.addEventListener('DOMContentLoaded', function(){
    //creo variabile che contine il link api
    const apiUrl = 'https://lanciweb.github.io/demo/api/pictures/';
    //seleziono i div dove ci saranno le foto
    const photoDiv = document.querySelectorAll('.photo ');
    //div per il titolo
    const titoloDiv = document.querySelectorAll('.pen')
    //div per le date
    const date =document.querySelectorAll('.date')

    //faccio la richiesta api con fetch
    fetch(apiUrl)

    //trasformo la risposta del server in json
    //questa funzione si esegue se la risposta arriva (.then)
    .then(response=> response.json())  //qui diventa in json(compatibile con jasvascript)
    //se arriva la risposta allora parte la funzione

    //quando arrivano i dati chiamali dati ricevuti
    .then(datiRicevuti=> {

     //per ogni div (foreach) (li scorre uno per uno)prende in fila un immagine che è dentro a larray (index)
     //index è la poszione (0,1,2) e scorre da solo

     photoDiv.forEach((div, index)=>{
        if (datiRicevuti[index]) {
            //per mettere il backgrounimage sotto forma di link e aggiusto tutto con css
            div.style.backgroundImage = `url(${datiRicevuti[index].url})`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
        }
            //data = tutte le immagini ricevute.

            //index = posizione attuale (prima, seconda, terz e oltre).

            //data[index] = immagine da mettere in quel posto.
            date[index].textContent = datiRicevuti[index].date  ||'senza data'; //Aggiunta la data sopra il titolo

            titoloDiv[index].textContent = datiRicevuti[index].title || 'Senza titolo';
            
            //datiRicevuti[index].title => prende il titolo associato all'immagine.

            //titoloDiv[index] => seleziona il div corrispondente con classe .pen nella posizione giusta.

            //textContent = ... => scrive il testo dentro quel div.
     })
    })
    //se per qualche ragione non arrivano le immagini da un errore

    .catch(error => {
        console.log('Errore nel recupero dell\'immagine:', error);
    });

})

// Definisco le funzioni on e off fuori dalla funzione DOMContentLoaded
// per renderle accessibili globalmente
function on() {
    document.getElementById("overlay").style.display = "block";
}
  
function off() {
    document.getElementById("overlay").style.display = "none";
}
