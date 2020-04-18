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
  var receivedMessages = $('.received');
  var time = new Date();
  var actualTime = ( time.getHours() + ':' + time.getMinutes() );
  console.log(actualTime);

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
      
      // Aggiungo al messaggio l'orario di invio
      $('.template li span').text(actualTime);

      // Aggiungo al messaggio il testo ottenuto dall'input
      $('.template li p').text(newText);

      // Clono il li del template
      var newInChatMessage = $('.template li').clone();
      
      // Aggiungo il li ottenuto alla chat
      sentMessages.append(newInChatMessage);

    }

    // Scroll automatico del contenitore della chat
    var chatContainer = $('.contents-main');
    chatContainer.scrollTop(chatContainer.innerHeight());

    // Reset dell'input
    newMessage.val('');

  };

  // Funzione che visualizza messaggi ricevuti
  function contactsMessages(){

    setTimeout( function() {

      // Aggiungo al messaggio di risposta un testo random
      $('.template-contacts li p').text(randomString());

      // Aggiungo al messaggio l'orario di invio
      $('.template-contacts li span').text(actualTime);
      
      // Clono il li di .template-contacts
      var newReceivedMessage = $('.template-contacts li').clone();
  
      // Aggiungo alla chat il messaggio clonato
      receivedMessages.append(newReceivedMessage);
  
    }, 2000);

  };

  // Ottenere una stringa random da un array
  function randomString(){

    // Creo l'array che contiene le stringhe
    var strings = [
      'Ciao come stai?',
      'ciao k fai',
      'tvb',
      '6 bll',
      'aiò',
      'bla bla bla',
      'sono un testo random'
    ];
    
    // Creo una variabile che sarà la stringa random
    var newString = strings[Math.floor( Math.random() * strings.length )];
    
    // La funzione ritorna la stringa random
    return newString; 

  };







































});