'use strict';

angular.module('myApp.members', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/members', {
            templateUrl: 'members/members.html',
            controller: 'MembersCtrl'
        });
    }])

    .controller('AddItemCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {
        // Takes input from the form. Currently 'user' and 'status' are hard coded
        $scope.item = {user: 1, status: "Available"};

        // Save fields to the item object
        $scope.addItem = function () {

            var fd = new FormData();
            fd.append("picture", $scope.item.picture);
            fd.append("first_name", $scope.member.first_name);
            fd.append("last_name", $scope.member.last_name);
            fd.append("phone_number", $scope.member.phone_number);
            fd.append("street", $scope.member.street);
            fd.append("apartment_number", $scope.member.apartment_number);
            fd.append("city", $scope.member.city);
            fd.append("state", $scope.member.state);
            fd.append("zip", $scope.member.zip);

            $http.post('http://localhost:8001/items/', fd, {
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                $location.path('/swap-gallery');
            }).error(function (response) {
                console.log('Error response: ' + response);
            });
        };

        $scope.uploadFile = function (files) {
            $scope.item.picture = files[0];
        };

    }]);