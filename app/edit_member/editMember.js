'use strict';

angular.module('myApp.editMember', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/members/:memberId', {
            templateUrl: 'edit_member/edit_member.html',
            controller: 'EditMemberCtrl'
        });
    }])

    .controller('EditMemberCtrl', ['$scope', 'Restangular', '$routeParams', '$location', '$http', function($scope, Restangular, $routeParams, $location, $http) {

        $scope.memberId = $routeParams.memberId;

        Restangular.one('members', $scope.memberId).customGET().then(function (data) {
            $scope.member = data;
        });

        $scope.deleteMember = function () {
            var confirmation = confirm('Are you sure you want to delete this member? \nThis cannot be undone.');

            if (confirmation) {
                Restangular.one('members', $scope.memberId).customDELETE().then(function () {
                        $location.path('/members/');
                    },
                    function () {
                        alert('There was a problem deleting your member')
                    })
            }
        };

        $scope.editMember = function () {

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

            $http.put('http://localhost:8002/members/' + $scope.member.id, fd, {
                headers: {'content-type': undefined},
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

        $scope.cancel = function () {

            $location.path('/members');

        }

    }]);
