$(function() {

  var $msgForm = $("#new-message form")
  var $msgInput = $("#message-input")
  var $messages = $("#messages")
  var socket = io();

  $msgForm.on('submit', function(e) {
    e.preventDefault();
    socket.emit('message', $msgInput.val())
    $msgInput.val('');
  });

  socket.on('message', function(newMessage) {
    $messages.append($('<li></li>', {text: newMessage, class: 'list-group-item'}))
  });

});