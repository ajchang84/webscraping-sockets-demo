$(function() {

  var $msgForm = $("#new-message form");
  var $msgInput = $("#message-input");
  var $messages = $("#messages");
  var socket = io();

  $msgForm.on('submit', function(e) {
    e.preventDefault();
    var message = $msgInput.val();
    $msgInput.val('');

    $.post({
      url: 'http://localhost:3001/api/messages',
      data: {message: message},
      crossDomain: true
    }).then(function(data) {
      console.log(data)
    })

    socket.emit('message', message);
  });

  socket.on('message', function(newMessage) {
    $messages.append($('<li></li>', {text: newMessage, class: 'list-group-item'}));
  });

});