/*
* Boolzap
Replica della grafica (allegata sotto con gli assets) con la possibilità di avere messaggi stilati e posizionati diversamente in base a: messaggio dall’utente (verdi) e messaggio dall’interlocutore (bianco) assegnando due classi CSS diverse.
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando icona ‘invia il testo’ viene aggiunto al thread sopra, come messaggio verde (ricordate focus() )
Font family: Lato
Messaggi visibili inizialmente sono inseriti statici nell’HTML
Usate un template nell’html e clone() per l’ inserimento del messaggio da fare in JS
*/
$( document ).ready(function() {
  
  // Referenze
  var newMessage = $('.new-message');
  var microphoneIcon = $('.fa-microphone');
  var sendIcon = $('.fa-paper-plane');
  var sentMessages = $('.sent');

  // Cambio dell'icona al focus dell'input
  newMessage.focus( function() {
    
    // Rimuovo l'icona precedente
    microphoneIcon.remove();

    // Aggiungo classe active per visualizzare l'icona di invio messaggio
    sendIcon.addClass('active');
  
  });

  // Invio del messaggio al click dell'icona visualizzata precedentemente
  sendIcon.click( function() {
    
    sendNewMessage();

    // Aggiunta di un messaggio ricevuto dai contatti
    contactsMessages();
  
  });

  // Invio del messaggio al keyup del tasto invio
  newMessage.keyup( function(event) {

    // Validazione tasto invio per compatibilità browser
    if ( event.which == 13 || event.keyCode == 13 ) {
      
      sendNewMessage();

      // Aggiunta di un messaggio ricevuto dai contatti
      contactsMessages();
    }

  });

  // Funzioni

  // Funzione di aggiunta messaggio alla chat
  function sendNewMessage(){

    // Ottengo il valore dell'input, eliminando eventuali spazi
    var newText = newMessage.val().trim();
    console.log(newText);

    // Validazione e aggiunta del testo alla chat
    if ( newText !== '' ) {
      
      // Clono il li del template
      var newInChatMessage = $('.template li').clone();
      
      // Ci aggiungo il testo ottenuto dall'input
      newInChatMessage.prepend(newText);
      
      // Aggiungo il li ottenuto alla chat
      sentMessages.append(newInChatMessage);
    }

    // Reset dell'input
    newMessage.val('');

  };

  // Funzione che visualizza messaggi ricevuti
  function contactsMessages(){

    setTimeout( function() {

      // Clono il li di .template-contacts
      var newReceivedMessage = $('.template-contacts li').clone();
  
      // Ottengo la chat dei messaggi ricevuti
      var receivedMessages = $('.received');
  
      // Aggiungo alla chat il messaggio clonato
      receivedMessages.append(newReceivedMessage);
  
    }, 2000);

  };







































});