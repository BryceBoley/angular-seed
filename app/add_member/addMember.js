'use strict';

angular.module('myApp.addMember', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-member', {
            templateUrl: 'add_member/add_member.html',
            controller: 'AddMemberCtrl'
        });
    }])

    .controller('AddMemberCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {

        //Add a new event, alert the user when it's been created or when there was a problem.
        $scope.addMember = function () {
            Restangular.all('members/').customPOST($scope.member).then(function () {
                    //alert("Your member was successfully added");
                    $location.path('/members');
                },
                function () {
                    alert("Please enter member information.")
                })
        };

        $scope.addPicture = function () {
            var boundary = "---------------------------7da24f2e50046";
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

            $http.post('http://localhost:8002/members/', fd, {
                headers: {'Content-Type': 'multipart/form-data' + boundary},
                transformRequest: angular.identity

            }).success(function (response) {
                $location.path('/members');
            }).error(function (response) {
                console.log('Error response: ' + response);
            });
        };

        $scope.uploadFile = function (files) {
            $scope.member.profile_picture = files[0];
            console.log($scope.member.profile_picture);
        };

    }]);