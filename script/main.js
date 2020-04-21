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
Boolzapp (Milestone 3)
Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire nuovi messaggi per ogni conversazione
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
*/
$( document ).ready(function() {
  
  // Referenze
  var newMessage = $('.new-message');
  var microphoneIcon = $('.fa-microphone');
  var sendIcon = $('.fa-paper-plane');
  var search = $('.new-chat');


  // Cambio dell'icona al focus dell'input
  newMessage.focus(function() {
    
    // Rimuovo l'icona precedente
    microphoneIcon.removeClass('active');

    // Aggiungo classe active per visualizzare l'icona di invio messaggio
    sendIcon.addClass('active');
  
  });

  $('.contents-main').on('click', function() {

    // Rimuovo l'icona precedente
    sendIcon.removeClass('active');

    // Aggiungo classe active per visualizzare l'icona di invio messaggio
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

  
  // Filtrare contatti durante la digitazione in un input
  search.keyup(function() {

    // this è l'attuale ricerca
    var newSearch = $(this).val().toLowerCase().trim();

    // each è un ciclo che in questo caso seleziona uno o più elementi con la classe .contact che soddisfano i requisiti all'interno della function di each
    $('.contact').each( function() {

      // attuale nome del contatto nel loop
      var contactName = $(this).find('.informations h4').text().toLowerCase();

      // verifica input con nomi contatti
      if ( contactName.includes(newSearch) ) {
        $(this).show();
      }
      else {
        $(this).hide();
      }

    });

  } );

  
  // Il click sul contatto mostra la conversazione del contatto cliccato
  $('.contact').click(function() {

    // Seleziono l'attributo che hanno in comune .contact e .container-messages
    var panel = $(this).attr('data-contact');

    // Rimuovere la classe .active
    $('.container-messages').removeClass('active');

    // Stessa cosa con .contents-user
    $('.contents-user').removeClass('active');

    // Aggiungo la classe .active al click del contatto corrispondente
    $('.container-messages[data-contact="' + panel + '"]').addClass('active');

    // Stessa cosa con .contents-user
    $('.contents-user[data-contact="' + panel + '"]').addClass('active');

  });

  
  /**************************************** 
  * Funzioni 
  *****************************************/

  // Funzione di aggiunta messaggio alla chat
  function sendNewMessage(){

    // Aggiungo chatMessages nella funzione per renderlo dinamico
    var chatMessages = $('.container-messages.active');

    // Ottengo il valore dell'input, eliminando eventuali spazi
    var newText = newMessage.val().trim();
    console.log(newText);

    // Validazione e aggiunta del testo alla chat
    if ( newText !== '' ) {

      // Clono il li del .template
      var newInChatMessage = $('.template .message').clone();
      
      // Aggiungo la classe .sent per assegnargli il layout dato dalla classe stessa
      newInChatMessage.addClass('sent');

      // Aggiungo al messaggio il testo ottenuto dall'input
      newInChatMessage.children('p').text(newText);
      
      // Aggiungo al messaggio l'orario di invio
      newInChatMessage.children('span').text(actualTime());

      // Aggiungo il li ottenuto alla chat
      chatMessages.append(newInChatMessage);

    }

    // Reset dell'input
    newMessage.val('');

    // Scroll automatico del contenitore della chat
    var chatContainer = $('.contents-main');
    chatContainer.scrollTop(chatContainer.innerHeight());

  };

 
  // Funzione che visualizza messaggi ricevuti dopo tot tempo
  function contactsMessages(){

    // Aggiungo chatMessages nella funzione per renderlo dinamico
    var chatMessages = $('.container-messages.active');

    // Stessa cosa con userInfo
    var userInfo = $('.contents-user.active');

    setTimeout( function() {

      // Clono il li di .template
      var newReceivedMessage = $('.template .message').clone();

      // Aggiungo la classe .received per leggibilità
      newReceivedMessage.addClass('received');

      // Aggiungo al messaggio di risposta un testo random
      newReceivedMessage.children('p').text(randomString());

      // Aggiungo al messaggio di risposta l'orario di invio
      newReceivedMessage.children('span').text(actualTime());

      // Aggiungo alla chat il messaggio clonato
      chatMessages.append(newReceivedMessage);

      userInfo.find('p').text( 'Ultimo accesso oggi alle ' + actualTime() );

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

  };

  // Funzione per cancellare un messaggio (attualmente non funzionante)
  function options(){

    // All'hover del messaggio compare l'icona
    $('#app').on('mouseover', '.message', function() {

    // children è l'icona figlia di .message
    $(this).children('i').toggleClass('active');

    });

  
    // Al click dell'icona compaiono le opzioni
    $('#app').on('click', '.message i', function() {

      // next è .message-options, le opzioni dopo l'icona
      $(this).next().toggleClass('active');

    });

  
    // Al click di .delete-message viene cancellato il messaggio
    $('#app').on('click', '.delete-message', function() {

      // parents('.message') è il padre che contiene .delete-message
      $(this).parents('.message').remove();
    });

  };













});