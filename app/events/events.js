'use strict';

angular.module('myApp.events', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'events/events.html',
            controller: 'EventsCtrl'
        });
    }])


    .controller('EventsCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {
        //my attempt to add data to fullCalendar
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        $scope.events = [];
            //{title: 'All Day Event', start: new Date(y, m, 1)},
            //{title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
            //{id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false},
            //{id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false},
            //{
            //    title: 'Birthday Party',
            //    start: new Date(y, m, d + 1, 19, 0),
            //    end: new Date(y, m, d + 1, 22, 30),
            //    allDay: false
            //},
            //{title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}


        $scope.uiConfig = {
            calendar: {
                height: 600,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                //eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };


        $scope.eventSources = [
            $scope.events
        ];


        Restangular.all('events').getList().then(function (data) {
            $scope.events = data;

        });
    }]);

