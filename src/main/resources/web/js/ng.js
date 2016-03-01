var app = angular.module('WS_APP', []);

app.controller('WS_CTRL', ['$scope', '$timeout', 'websocketService', function($scope, $timeout, websocketService) {

	$scope.users = [];
	$scope.messages = [];
    $scope.alias = '';
    $scope.message = '';
    $scope.isLogged = false;

    $scope.$on('websocket', function(e, type, data) {
		if (type === 'users')
			$scope.users = data;
		else
			$scope.messages = data;
    });

	$scope.login = function() {
		websocketService.login('ws://192.168.100.121:8080/ws/', $scope.alias);
		$scope.isLogged = true;
	};

	$scope.logoff = function() {
		websocketService.logoff();
		$scope.alias = '';
		$scope.isLogged = false;
		$scope.message = '';
	};

	$scope.send = function() {
		websocketService.send($scope.message);
		$scope.message = '';
	};

}]);

app.controller('WS_CTRL', function($scope, WS_server){
    $scope.WS = WS_server;
    $scope.eventA = function(){
        WS_server.send('eventA');
    };
    $scope.eventB = function(){
        WS_server.send('eventB');
    };
});
