'use strict';

angular.module('myApp.add_event', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_event', {
    templateUrl: 'add_event/add_event.html',
    controller: 'AddEventCtrl'
  });
}])

  .controller('AddEventCtrl', ['$scope', 'Restangular', '$location', function ($scope, Restangular, $location) {
        // Initialize an empty event object with an empty members list inside.

        $scope.event = {
            members: []
        };


        // Add the members to the event object we're building
        $scope.addMemberToEvent = function(memberName) {
            var member = {name: memberName};
            $scope.event.members.push(member);
            $scope.memberName = '';

        };


        // Add a new event, alert the user when it's been created or when there was a problem.
        $scope.addEvent = function () {
            Restangular.all('add_event').customPOST($scope.event).then(function () {
                    alert("Your event was successfully created");
                    $location.path('/events');
                },
                function () {
                    alert("There was a problem creating your event. Please try again.")
                })}
    }]);