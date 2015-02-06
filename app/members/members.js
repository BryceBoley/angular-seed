'use strict';

angular.module('myApp.members', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/members', {
            templateUrl: 'members/members.html',
            controller: 'MembersCtrl'
        });
    }])

    .controller('MembersCtrl', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location) {

        $scope.addMember = function () {
            Restangular.all('members/').customPOST($scope.member).then(function () {
                    alert("Your member was successfully added");
                    $location.path('/members');
                },
                function () {
                    alert("There was a problem adding your member. Please try again.")
                })}
    }]);