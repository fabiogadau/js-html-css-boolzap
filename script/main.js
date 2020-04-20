/*
* Boolzap

Boolzapp (Milestone 1)
Replica della grafica (allegata sotto con gli assets) con la possibilità di avere messaggi stilati e posizionati diversamente in base a: messaggio dall’utente (verdi) e messaggio dall’interlocutore (bianco) assegnando due classi CSS diverse.
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando icona ‘invia il testo’ viene aggiunto al thread sopra, come messaggio verde (ricordate focus() )
Font family: Lato
Messaggi visibili inizialmente sono inseriti statici nell’HTML
Usate un template nell’html e clone() per l’ inserimento del messaggio da fare in JS

Boolzapp (Milestone 2)
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
*/
$( document ).ready(function() {
  
  // Referenze
  var newMessage = $('.new-message');
  var microphoneIcon = $('.fa-microphone');
  var sendIcon = $('.fa-paper-plane');
  var chatMessages = $('.container-messages');
  var search = $('.new-chat');

  // Cambio dell'icona al focus dell'input
  newMessage.on('focus blur', function() {
    
    // Rimuovo l'icona precedente
    microphoneIcon.removeClass('active');

    // Aggiungo classe active per visualizzare l'icona di invio messaggio
    sendIcon.addClass('active');
  
  });

  // All'uscita dall'input visualizzo di nuovo l'icona del microfono
  $('.contents-main').on('click', function() {

    // Rimuovo l'icona precedente
    sendIcon.removeClass('active');

    // Aggiungo classe active per visualizzare l'icona del microfono
    microphoneIcon.addClass('active');

  });

  // Invio del messaggio al click dell'icona di invio messaggio
  sendIcon.click( function() {
    
    // Funzione di invio messaggio
    sendNewMessage();

    // Aggiunta di un messaggio ricevuto dai contatti
    contactsMessages();
  
  });

  // Invio del messaggio al keyup del tasto invio
  newMessage.keyup( function(event) {

    // Validazione tasto invio per compatibilità browser
    if ( event.which == 13 || event.keyCode == 13 ) {
      
      // Funzione di invio messaggio
      sendNewMessage();

      // Aggiunta di un messaggio ricevuto dai contatti
      contactsMessages();
    }

  });

  search.keyup(function() {

    if ( $(this).value.trim().length == 0  ) {
      $('.contact').addClass('visible');
    }
    else {
      $('.contact').removeClass('visible');
    }
    
    

    

    

  } );

  // Funzioni

  // Funzione di aggiunta messaggio alla chat
  function sendNewMessage(){

    // Ottengo il valore dell'input, eliminando eventuali spazi
    var newText = newMessage.val().trim();
    console.log(newText);

    // Validazione e aggiunta del testo alla chat
    if ( newText !== '' ) {
      
      // Aggiungo al messaggio l'orario di invio
      $('.template .message span').text(actualTime());

      // Aggiungo al messaggio il testo ottenuto dall'input
      $('.template .message p').text(newText);

      // Clono il li del .template
      var newInChatMessage = $('.template .message').clone();

      newInChatMessage.addClass('sent');
      
      // Aggiungo il li ottenuto alla chat
      chatMessages.append(newInChatMessage);

    }

    // Reset dell'input
    newMessage.val('');

  };

  // Funzione che visualizza messaggi ricevuti dopo tot tempo
  function contactsMessages(){

    setTimeout( function() {

      // Aggiungo al messaggio di risposta un testo random
      $('.template-contacts .message p').text(randomString());

      // Aggiungo al messaggio di risposta l'orario di invio
      $('.template-contacts .message span').text(actualTime());
      
      // Clono il li di .template-contacts
      var newReceivedMessage = $('.template-contacts .message').clone();

      newReceivedMessage.addClass('received');
  
      // Aggiungo alla chat il messaggio clonato
      chatMessages.append(newReceivedMessage);

      // Scroll automatico del contenitore della chat
      var chatContainer = $('.contents-main');
      chatContainer.scrollTop(chatContainer.innerHeight());
  
    }, 1000);

  };

  // Funzione che ottiene una stringa random da un array
  function randomString(){

    // Creo l'array che contiene le stringhe
    var strings = [
      'ok',
      'Ciao come stai?',
      'ciao k fai',
      'tvb',
      '6 bll',
      'aiò',
      'bla bla bla',
      'sono un testo random',
      'ciao sono un testo più lungo e servo a controllare se il layout è a posto'
    ];
    
    // Creo una variabile che sarà la stringa random
    var newString = strings[Math.floor( Math.random() * strings.length )];
    
    // La funzione ritorna la stringa random
    return newString; 

  };

  // Funzione orario
  function actualTime(){

    var time = new Date();
    var hour = addZero( time.getHours() );
    var minutes = addZero( time.getMinutes() );
    var actualTime = ( hour + ':' + minutes );

    return actualTime;

  };

  // Funzione che aggiunge uno zero prima del numero se il numero è inferiore a 10
  function addZero(number){

    if (number < 10) {
      number = '0' + number;
    }

    return number;

  }







































});