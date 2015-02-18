'use strict';

angular.module('myApp.members', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/members', {
            templateUrl: 'members/members.html',
            controller: 'MembersCtrl'
        });
    }])

    .controller('MembersCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        Restangular.all('members').getList().then(function (data) {
            $scope.members = data;
        });
    }])

    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });



