'use strict';

angular.module('myApp.addMember', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-member', {
            templateUrl: 'add_member/add_member.html',
            controller: 'AddMemberCtrl'
        });
    }])

    .controller('AddMemberCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {

        $scope.addMember = function () {
            var fd = new FormData();
            fd.append("profile_picture", $scope.member.profile_picture);
            fd.append("first_name", $scope.member.first_name);
            fd.append("last_name", $scope.member.last_name);
            fd.append("phone_number", $scope.member.phone_number);
            fd.append("street", $scope.member.street);
            fd.append("apartment_number", $scope.member.apartment_number);
            fd.append("city", $scope.member.city);
            fd.append("state", $scope.member.state);
            fd.append("zip", $scope.member.zip);

            console.log(fd);

            $http.post('/api/members/', fd, {
                headers: {'Content-type': undefined },
                transformRequest: angular.identity

            }).success(function () {
                $location.path('/members');
            }).error(function (response) {
                console.log('Error response: ' + response);
            })};

        $scope.uploadFile = function (files) {
            $scope.member.profile_picture = files[0];
            console.log($scope.member.profile_picture);
        };

        $scope.convertImageUrl = function (url) {
            return url.replace(/http:.*media/, '/api/media');
        };

        $scope.cancel = function () {
             $location.path('/members');

        }

        }]);