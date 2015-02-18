'use strict';

angular.module('myApp.editMember', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/members/:memberId', {
            templateUrl: 'edit_member/edit_member.html',
            controller: 'EditMemberCtrl'
        });
    }])

    .controller('EditMemberCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function($scope, Restangular, $routeParams, $location) {

        $scope.memberId = $routeParams.memberId;

        Restangular.one('members', $scope.memberId).customGET().then(function (data) {
            $scope.member = data;
        });


        $scope.deleteMember = function () {
            var confirmation = confirm('Are you sure you want to delete this member? \nThis cannot be undone.');

            if (confirmation) {
                Restangular.one('members', $scope.memberId).customDELETE().then(function () {
                        //alert('Your member was successfully deleted!');
                        $location.path('/members/');
                    },
                    function () {
                        alert('There was a problem deleting your member')
                    })
            }
        };

        $scope.editMember = function () {



            Restangular.one('members', $scope.memberId).customPUT($scope.member).then(function() {
                    $location.path('/members');
                    //alert('Information updated!')
                },
                function () {
                    alert('There was a problem updating your event.\nDid you fill out all of the required fields?')
                })



        };

        $scope.cancel = function () {

            $location.path('/members');


        };

    }]);
