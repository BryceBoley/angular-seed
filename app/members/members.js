'use strict';

angular.module('myApp.members', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/members', {
            templateUrl: 'members/members.html',
            controller: 'MembersCtrl'
        });
    }])

    .controller('RecipesCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
        Restangular.all('members').getList().then(function(members) {
            $scope.members = members;
        });
    }]);