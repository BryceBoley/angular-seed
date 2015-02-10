'use strict';

angular.module('myApp.events', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'events/events.html',
            controller: 'EventsCtrl'
        });
    }])

    .controller('EventsCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        Restangular.all('events').getList().then(function (data) {
            $scope.events = data;
        });
    }]);

