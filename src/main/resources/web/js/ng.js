var $message = $("#message");

var app = angular.module("WS_APP", []);

app.controller("WS_CTRL", ["$scope", function($scope){

    var conn = new WebSocket("ws://localhost:8080/ws/");

    conn.onclose = function(e){
        $scope.$apply(function(){
            $message.push("DISCONNECTED");
        })
    }

    conn.onopen = function(e){
        $scope.$apply(function(){
            $message.push("CONNECTED");
        })
    }

    conn.onmessage = function(e){
        $scope.$apply(function(){
            var rs = JSON.parse(e.data);
            if(null != rs.message){
                var element1 = angular.element("<p>"+rs.message+"</p>");
                $message.prepend(element1);
            }
            if(null != rs.datetime){
                $scope.time =rs.datetime;
            }
            if(rs.wssessions.length >0 ){
                $scope.slist = [];
                console.log("log", rs.wssessions.length);
                for (var i = 0; i < rs.wssessions.length; i++) {
                    $scope.slist.push({
                        ip: rs.wssessions[i].ip,
                        session: rs.wssessions[i].name
                    });
                }
            }
        })
    }

    $scope.send = function(e){
        conn.send($scope.msg);
    }
}]);