var myApp = angular.module('myApp', []);

myApp.controller('appControl', ['$scope', '$http', function($scope, $http) {

    var refresh = function() {
        $http.get('/activity').then(function success(response) {
            console.log('I got the data I requested');
            $scope.activityList = response.data;
            $scope.activity = {};
        }, function error(response) {
            console.log('No data!')
        });
    };

    refresh();

    $scope.addStat = function() {
        console.log($scope.activity);
        $http.post('/activity', $scope.activity).then(function success(response) {
            console.log(response);
            refresh();
        }, function error(response) {
            console.log('No data!')
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/activity/' + id).then(function success(response) {
            console.log(response);
            refresh();
        }, function error(response) {
            console.log('No data!')
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/activity/' + id).then(function success(response) {
            $scope.activity = response.data;
        }, function error(response) {
            console.log('No data!')
        });
    };

    $scope.update = function() {
        console.log($scope.activity._id);
        $http.put('/activity/' + $scope.activity._id, $scope.activity).then(function success(response) {
            console.log(response);
            refresh();
        }, function error(response) {
            console.log('No data!')
        });
    };

    $scope.clear = function() {
        $scope.activity = {};
        refresh();
    };
}]);