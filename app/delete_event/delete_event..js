'use strict';

angular.module('myApp.deleteEvent', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/event/:eventId', {
    templateUrl: 'delete_event/delete_event.html',
    controller: 'DeleteEventCtrl'
  });
}])

.controller('DeleteEventCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function($scope, Restangular, $routeParams, $location) {

        $scope.eventId = $routeParams.eventId;

        Restangular.one('event', $scope.recipeId).customGET().then(function (data) {
            $scope.recipe = data;


        });


        $scope.deleteRecipe = function () {
            var confirmation = confirm('Are you sure you want to delete this recipe? This cannot be undone');

            if (confirmation) {
                Restangular.one('recipes', $scope.recipeId).customDELETE().then(function () {
                        alert('Your recipe was successfully deleted!');
                        $location.path('/recipes');
                    },
                    function () {
                        alert('There was a problem deleting your recipe')
                    })
            }
        }
}]);