'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.event',
  'myApp.view2',
  'myApp.version',
  'restangular'
]).
config(['$routeProvider', function($routeProvider, RestangularProvider) {
  $routeProvider.otherwise({redirectTo: '/event'});

  RestangularProvider.setBaseUrl('http://localhost:8002');
}]);
