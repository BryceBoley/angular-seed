'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.events',
    'myApp.addEvent',
    //'myApp.editEvent',
    'myApp.members',
    'myApp.addMember',
    'myApp.editMember',
    'myApp.version',
    'restangular',
    'ui.calendar',
    'ui.bootstrap',
    'xeditable'

])
    .config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/events'});

        RestangularProvider.setBaseUrl('http://localhost:8002');
    }])

    .run(function (editableOptions, editableThemes) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
    });