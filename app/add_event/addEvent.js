'use strict';

angular.module('myApp.addEvent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-event', {
    templateUrl: 'add_event/add_event.html',
    controller: 'AddEventCtrl'
  });
}])

  .controller('AddEventCtrl', ['$scope', 'Restangular', '$location', function ($scope, Restangular, $location) {

        $scope.addEvent = function () {
            Restangular.all('events/').customPOST($scope.event).then(function () {
                    $location.path('/events');
                },
                function () {
                    alert("There was a problem creating your event. Please try again.")
                })
        };
    }]);