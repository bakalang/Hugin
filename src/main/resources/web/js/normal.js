"use strict";

var $status = $("#status");
var $time = $("#time");
var socket = null;

function connectSocket() {
  if(socket == null) {
     socket = new WebSocket("ws://192.168.100.121:8080/ws/");

     socket.onopen = function() {
        console.log("Connected!");
        $status.prepend("<p>Connected websocket!</p>");
     };

     socket.onclose = function() {
        console.log("Closed!");
        $status.prepend("<p>Closed websocket</p>");
     };

     socket.onmessage = function(msg) {
        var rs = JSON.parse(msg.data);
        console.log("Got rs ", rs, this);
        if(null != rs.message){
            $status.prepend("<p>" + rs.message + "</p>");
        }
        if(null != rs.datetime){
            $time.val(rs.datetime);
        }
     };
  }
}

$("#broadcastBtn").click(function() {
  var msg = $("#msg").val();
  $.ajax({
     type: "POST",
     url: "/broadcast",
     data: msg,
     contentType: "text/plain"
  });
});

$("#sendBtn").click(function() {
  if(socket != null) {
     socket.send($("#msg").val());
  }
});

$("#connectBtn").click(connectSocket);

$("#disconnectBtn").click(function() {
  if(socket != null) {
     socket.close();
     socket = null;
  }
});
//}(dwws, jQuery));
