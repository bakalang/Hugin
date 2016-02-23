"use strict";

var app = angular.module('WS_APP', [ngWebSocket]);

app.factory('WS', function($websocket){
    // open connection
    var ws = $websocket("ws://192.168.100.121:8080/ws/");
    var slist = [];

//    ws.onError(function (event) {
//        console.log('connection Error', event);
//    )};
//
//    ws.onClose(function (event) {
//        console.log('connection closed', event);
//    )};
//
//    ws.onOpen(function () {
//        console.log('connection open');
//    )};
//
//    ws.onMessage(function (event) {
//        console.log('message: ', event.data);
//        var response = angular.fromJson(event.data);
//        if(null != response.message){
//            $status.prepend("<p>" + response.message + "</p>");
//        }
//        if(null != response.datetime){
//            $time.val(response.datetime);
//        }
//        if(response.slist.length > 0){
//            for (var i = 0; i < response.slist.length; i++) {
//                slist.push({
//                    ip: response.slist[i].ip,
//                    session: response.slist[i].session
//                });
//            }
//        }
//    )};

    return {
        slist : slist,
        send: function (message) {
            ws.send(message);
        }
    };
});

//app.controller('WS_CTRL', function($scope SList){
//   $scope.SList = SList;
//
//   $scope.send = function(){
//         WS.send($("#msg").val());
//   };
//})
