$(function() {

  var $msgForm = $("#new-message form");
  var $msgInput = $("#message-input");
  var $messages = $("#messages");
  var socket = io();
  var dataSet = [];

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

    dataSet.push(data);
    updateGraph();
  });

  // set up svg
  var margin = {top: 30, right: 20, bottom: 30, left: 50};
  var width = 600 - margin.left - margin.right;
  var height = 600 - margin.top - margin.bottom;

  var svg = d3.select('#graph')
              .append('svg')
              .attr('height', height)
              .attr('width', width)

  var xScale = d3.scaleLinear().domain([-1,1]).range([margin.left,width - margin.right]);
  var yScale = d3.scaleLinear().domain([0,1]).range([height - margin.top,margin.bottom]);

  function updateGraph() {
    svg.selectAll('circle')
      .data(dataSet)
      .enter()
      .append('circle')
      .attr('cx', function(d) {
        return xScale(d.polarity);
      })
      .attr('cy', function(d) {
        return yScale(d.subjectivity);
      })
      .attr('fill', '#2aabd2')
      .attr('stroke', '#265a88')
      .attr('r', function(d) {
        return Math.max(3,Math.sqrt(d.length)/10);
      })
  }
        
  updateGraph();

});