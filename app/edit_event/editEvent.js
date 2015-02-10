'use strict';

angular.module('myApp.editEvent', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/events/:eventId', {
            templateUrl: 'edit_event/edit_event.html',
            controller: 'EditEventCtrl'
        });
    }])

    .controller('EditEventCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function($scope, Restangular, $routeParams, $location) {

        $scope.eventId = $routeParams.eventId;

        Restangular.one('events', $scope.eventId).customGET().then(function (data) {
            $scope.event = data;
        });


        $scope.deleteEvent = function () {
            var confirmation = confirm('Are you sure you want to delete this event? This cannot be undone');

            if (confirmation) {
                Restangular.one('events', $scope.eventId).customDELETE().then(function () {
                        alert('Your event was successfully deleted!');
                        $location.path('/events/');
                    },
                    function () {
                        alert('There was a problem deleting your event')
                    })
            }
        }
    }]);