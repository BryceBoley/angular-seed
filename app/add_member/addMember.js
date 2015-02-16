'use strict';

angular.module('myApp.addMember', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-member', {
            templateUrl: 'add_member/add_member.html',
            controller: 'AddMemberCtrl'
        });
    }])

    .controller('AddMemberCtrl', ['$scope', 'Restangular', '$location', function ($scope, Restangular, $location) {

        // Add a new event, alert the user when it's been created or when there was a problem.
        $scope.addMember = function () {
            Restangular.all('members/').customPOST($scope.member).then(function () {
                    alert("Your member was successfully added");
                    $location.path('/members');
                },
                function () {
                    alert("Please enter member information.")
                })
        };
    }]);