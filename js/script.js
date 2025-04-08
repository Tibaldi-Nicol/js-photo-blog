//aspetto che la pagina si carica tutta e dopo parte la funzione
document.addEventListener('DOMContentLoaded', function(){
    //creo variabile che contine il link api
    const apiUrl = 'https://lanciweb.github.io/demo/api/pictures/';
    
    //seleziono i div dove ci saranno le foto
    const photoDiv = document.querySelectorAll('.photo');
    
    //div per il titolo
    const titoloDiv = document.querySelectorAll('.pen');
    
    //div per le date
    const date = document.querySelectorAll('.date');
    
    //seleziono l'overlay e il suo contenuto per poterli modificare dopo
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('text');
    
    //faccio la richiesta api con fetch
    fetch(apiUrl)
    
    //trasformo la risposta del server in json
    //questa funzione si esegue se la risposta arriva (.then)
    .then(response=> response.json())  //qui diventa in json(compatibile con jasvascript)
    
    //se arriva la risposta allora parte la funzione
    
    //quando arrivano i dati chiamali datiRicevuti
    .then(datiRicevuti=> {
    
        //per ogni div (foreach) (li scorre uno per uno)prende in fila un immagine che è dentro a larray (index)
        //index è la poszione (0,1,2) e scorre da solo
        photoDiv.forEach((div, index)=>{
            if (datiRicevuti[index]) {
                //per mettere il backgrounimage sotto forma di link e aggiusto tutto con css
                div.style.backgroundImage = `url(${datiRicevuti[index].url})`;
                div.style.backgroundSize = 'cover';
                div.style.backgroundPosition = 'center';
                
                //aggiungo evento click per aprire l'overlay con l'immagine
                //quando l'utente clicca sulla foto, esegue questa funzione
                div.addEventListener('click', function() {
                    //preparo il contenuto HTML da inserire nell'overlay
                    //mostro l'immagine grande, il titolo e la data
                    overlayContent.innerHTML = `
                        <img src="${datiRicevuti[index].url}" alt="${datiRicevuti[index].title}" style="max-width: 80%; max-height: 80vh;">
                        <h3>${datiRicevuti[index].title || 'Senza titolo'}</h3>
                        <p>${datiRicevuti[index].date || 'senza data'}</p>
                    `;
                    //chiamo la funzione on() che mostra l'overlay
                    on();
                });
            }
            
            //data = tutte le immagini ricevute.
            
            //index = posizione attuale (prima, seconda, terz e oltre).
            
            //data[index] = immagine da mettere in quel posto.
            
            //inserisco la data nel div con classe .date, se non c'è la data metto "senza data"
            date[index].textContent = datiRicevuti[index].date || 'senza data'; //Aggiunta la data sopra il titolo
            
            //inserisco il titolo nel div con classe .pen, se non c'è il titolo metto "Senza titolo"
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
 
 // Funzione per mostrare l'overlay quando viene chiamata
 // Cambia la proprietà display da "none" a "block" per renderlo visibile
 function on() {
    document.getElementById("overlay").style.display = "block";
 }
 
 // Funzione per nascondere l'overlay quando viene chiamata
 // Cambia la proprietà display da "block" a "none" per nasconderlo
 function off() {
    document.getElementById("overlay").style.display = "none";
 }
 
 // Riassunto di cosa fa questo script:
 // 1. Carica i dati delle immagini da un'API esterna quando la pagina è pronta
 // 2. Per ogni div con classe .photo aggiunge l'immagine di sfondo
 // 3. Inserisce la data e il titolo nei rispettivi div per ogni foto
 // 4. Aggiunge un evento click a ogni foto che mostra l'overlay con l'immagine ingrandita
 // 5. Definisce le funzioni on() e off() per gestire la visualizzazione dell'overlay
 // 6. La funzione on() viene chiamata quando l'utente clicca su una foto
 // 7. La funzione off() viene chiamata quando l'utente clicca sull'overlay (tramite onclick="off()" nell'HTML)
 // 8. In caso di errore nel caricamento delle immagini, mostra un messaggio nella console
