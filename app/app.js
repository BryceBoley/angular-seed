'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.events',
    'myApp.addEvent',
    'myApp.members',
    'myApp.addMember',
    'myApp.editMember',
    'myApp.version',
    'restangular',
    'ui.calendar',
    'ui.bootstrap'

])
    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/events'});

        RestangularProvider.setBaseUrl('http://localhost:8002');
    }]);