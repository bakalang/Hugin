//"use strict";

var app = angular.module('WS_APP', ['ngWebsocket']);

app.factory('WS_server', function($websocket){
    // open connection
    console.log('open connection');
    var ws = $websocket.$new({'url': 'ws://192.168.100.121:8080/ws/', 'protocols':[], 'subprotocols': ['base46']} );
    var slist =[];
    var datetime;
//    var rs;

    ws.$on('$error', function (event) {
        console.log('connection Error', event);
    });
    ws.$on('$close',function (event) {
        console.log('connection closed', event);
    });
    ws.$on('$open', function () {
            ws.$emit('ws connect', 'hi server!');
    });
    ws.$on('$message', function (message) {
        rs = JSON.parse(message);
        if(rs.wssessions.length >0 ){
//            slist = [];
            console.log("log", rs.wssessions.length);
            for (var i = 0; i < rs.wssessions.length; i++) {
                slist.push({
                    ip: rs.wssessions[i].ip,
                    session: rs.wssessions[i].name
                });
            }
            console.log('slist length: ', slist.length);
//            aaaa = '111';
//            console.log('1datetime', aaaa);
        }
        if(null != rs.datetime){
            datetime = rs.datetime;
            console.log('2datetime', datetime);
        }
//        if('message' == rs.event){
//            $status.prepend("<p>" + rs.message + "</p>");
//        }
    });

    return {
        datetime: datetime,
//        rs: rs,
        slist: slist,
        send: function (event) {
            ws.$emit('ws input', $("#msg").val());
        }
    };
});

app.controller('WS_CTRL', function($scope, WS_server){
    $scope.WS = WS_server;
    $scope.eventA = function(){
        WS_server.send('eventA');
    };
    $scope.eventB = function(){
        WS_server.send('eventB');
    };
//    $scope.bindtime = function(){
//        return 'now: '+WS_server.datetime;
//    };
});
