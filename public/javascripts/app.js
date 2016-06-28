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
      socket.emit('message', data);
    });

  });

  socket.on('message', function(data) {
    var $newLi = $('<li></li>', {
      text: data.message, 
      class: 'list-group-item'
    });
    var $displayedData = $('<span></span>', {
      text: '(' + data.polarity.toFixed(3) + ', ' + data.subjectivity.toFixed(3) + ')',
      class: 'badge'
    });
    $newLi.append($displayedData);
    $messages.append($newLi);
  });

});