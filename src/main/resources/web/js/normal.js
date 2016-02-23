//var dwws = dwws || {};
//
//(function (dwws, $) {
"use strict";
//
//var app = angular.module('myapp', ['ngWebsocket']);
//app.factory('ws', function ($websocket) {
//    var ws = $websocket.$new('ws://192.168.100.121:8080/ws/');
//
////    var atp = [];
//
//    //onMessage
//    ws.onMessage(function (event) {
//        console.log('Got rs: ', event.data);
//        var response = angular.fromJson(event.data);
//        if(null != response.message){
//            $status.prepend("<p>" + response.message + "</p>");
//        }
//        if(null != response.datetime){
//            $time.val(response.datetime);
//        }
//    };
//
//    //onError
//    ws.onError(function (event) {
//        console.log('connection Error', event);
//    }
//
//    //onClose
//    ws.onClose(function (event) {
//        console.log('connection closed', event);
//    }
//
//    //onOpen
//    ws.onOpen(function () {
//        console.log('connection open');
//        ws.send('HELLO SERVER');
//    }
//
//    return {
//        send: function (message) {
//            ws.send(message);
//        }
//    }
//});
//
//app.controller('atpController', function ($scope, ATP) {
//
//});
//
//
//

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
