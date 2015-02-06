'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.events',
    'myApp.add_event',
    'myApp.view3',
    'myApp.version',
    'restangular'
])
    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/events'});

        RestangularProvider.setBaseUrl('http://localhost:8001');
    }]);
