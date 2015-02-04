'use strict';

angular.module('myApp.event', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event', {
    templateUrl: 'event/event.html',
    controller: 'eventCtrl'
  });
}])

.controller('EventCtrl', [function(Restangular) {

}]);