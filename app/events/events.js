'use strict';

angular.module('myApp.events', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/events', {
            templateUrl: 'events/events.html',
            controller: 'EventsCtrl'
        });
    }])

    .controller('EventsCtrl', ['$scope', '$compile', 'uiCalendarConfig', 'Restangular', '$modal', '$routeParams', '$location', function ($scope, $compile, uiCalendarConfig, Restangular, $modal, $routeParams, $location) {

        $scope.eventId = $routeParams.eventId;

        //Restangular.one('events', $scope.eventId).customGET().then(function (data) {
        //   $scope.event = data;
        //   });

        $scope.eventSources = [];
        /* config object */


        Restangular.all('events').getList().then(function (data) {
            for (var eventIndex = 0; eventIndex < data.length; eventIndex++) {
                var event = data[eventIndex];
                $scope.events.push(event);
            }
        });
        $scope.events = [];


        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        /* event source that pulls from google.com */
        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };

        /* event source that calls a function on every view switch */
        //$scope.eventsF = function (start, end, timezone, callback) {
        //    var s = new Date(start).getTime() / 1000;
        //    var e = new Date(end).getTime() / 1000;
        //    var m = new Date(start).getMonth();
        //    var events = [{
        //        title: 'Feed Me ' + m,
        //        start: s + (50000),
        //        end: s + (100000),
        //        allDay: false,
        //
        //    }];
        //    callback(events);
        //};

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {
                    type: 'party',
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    type: 'party',
                    title: 'Lunch 2',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    type: 'party',
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }
            ]
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            //$scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
            //save new date to database

            var eventCopy = {
                title: event.title,
                id: event._id,
                comment: event.comment,
                host: event.host,
                start: event.start,
                when: event.when
            };

            var day = eventCopy.start.getDate();
            var month = eventCopy.start.getMonth() + 1;
            var year = eventCopy.start.getFullYear();

            eventCopy.start = year + '-' + month + '-' + day;
            JSON.stringify(eventCopy);

            Restangular.all('events/' + event.id).customPUT(eventCopy).then(function () {
                    //alert("Event date was changed successfully!");
                    $location.path('/events');
                },
                function () {
                    //alert("There was a problem")
                })
        };

        //change title

        $scope.alertOnEventClick = function (ev, jsEvent, view) {

            var modalInstance = $modal.open({
                templateUrl: 'events/editEventModal.html',
                controller: 'EventEditCtrl',
                //size: size,
                resolve: {
                    ev: function () {
                        return ev;
                    }
                }
            });

            modalInstance.result.then(function (deleteEvent) {
                if (deleteEvent) { // Delete the event.
                    Restangular.one('events', ev.id).customDELETE().then(function () {

                        },
                        function () {
                            alert('There was a problem deleting your event')
                        });

                    var eventIndex = $scope.events.indexOf(ev);
                    $scope.events.splice(eventIndex, 1);
                }

                else { // PUT (update) the event.

                    var eventCopy = $scope.convertDate(ev);

                    Restangular.one('events', ev.id).customPUT(eventCopy).then(function () {
                        },
                        function () {
                            alert('There was a problem updating your event')
                        })
                }
            })
        };


        $scope.deleteEvent = function () {
            console.log('line 155');
            var confirmation = confirm('Are you sure you want to delete this event? This cannot be undone');

            if (confirmation) {
                Restangular.one('events', $scope.eventId).customDELETE().then(function () {

                        $location.path('/events/');
                    },
                    function () {
                        alert('There was a problem deleting your event')
                    })
            }
        };



        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };

        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };



        var selectDateModal = function (start, end) {

            var dateBounds = {start: start, end: end};

            var modalInstance = $modal.open({
                templateUrl: 'events/newEventModal.html',
                controller: 'NewEventCtrl',
                //size: size,
                resolve: {
                    dateBounds: function () {
                        return dateBounds;
                    }
                }
            });

            modalInstance.result.then(function (event) {



                var eventCopy = angular.copy(event);

                var day = eventCopy.start.getDate();
                var month = eventCopy.start.getMonth() + 1;
                var year = eventCopy.start.getFullYear();

                eventCopy.start = year + '-' + month + '-' + day;

                //$log.info('Modal dismissed at: ' + new Date());
                Restangular.one('events/').customPOST(eventCopy).then(function (postedEvent) {

                        $scope.events.push(postedEvent)
                    },
                    function () {
                        alert("There was a problem")
                    })
            });
        };

        $scope.convertDate = function (event) {
            var eventCopy = {
                title: event.title,
                id: event._id,
                comment: event.comment,
                host: event.host,
                start: event.start,
                when: event.when
            };

            var day = eventCopy.start.getDate();
            var month = eventCopy.start.getMonth() + 1;
            var year = eventCopy.start.getFullYear();

            eventCopy.start = year + '-' + month + '-' + day;
            return JSON.stringify(eventCopy);

            //return eventCopy;
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {

                height: 600,
                editable: true,
                selectable: true,
                select: selectDateModal,
                header: {
                    left: 'month agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },

                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };



        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource];
        //$scope.eventSources2 = [$scope.calEventsExt, $scope.events];


    }])

    .controller('NewEventCtrl', function ($scope, $modalInstance, dateBounds) {
        $scope.event = {start: dateBounds.start, end: dateBounds.end};
        $scope.dateBounds = dateBounds;

        $scope.ok = function () {
            $modalInstance.close($scope.event);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })

    .controller('EventEditCtrl', function (Restangular, $scope, $modalInstance, ev) {
        $scope.event = ev;

        $scope.deleteEvent = function () {
            var confirmation = confirm('Are you sure you want to delete this event? This cannot be undone');
            if (confirmation) {
                $modalInstance.close(true);
            }
        };

        $scope.editEvent = function () {
            $modalInstance.close(false);
        };
    });