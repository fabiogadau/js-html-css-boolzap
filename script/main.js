/*
* Boolzap
Replica della grafica (allegata sotto con gli assets) con la possibilità di avere messaggi stilati e posizionati diversamente in base a: messaggio dall’utente (verdi) e messaggio dall’interlocutore (bianco) assegnando due classi CSS diverse.
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando icona ‘invia il testo’ viene aggiunto al thread sopra, come messaggio verde (ricordate focus() )
Font family: Lato
Messaggi visibili inizialmente sono inseriti statici nell’HTML
Usate un template nell’html e clone() per l’ inserimento del messaggio da fare in JS
*/
$( document ).ready(function() {
  
  var newMessage = $('.new-message');
  var microphoneIcon = $('.fa-microphone');
  var sendIcon = $('.fa-paper-plane');

  newMessage.focus( function() {
    microphoneIcon.remove();
    sendIcon.addClass('active');
  });

  sendIcon.click( function() {
    
  })







































});