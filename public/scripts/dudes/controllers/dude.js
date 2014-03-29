(function() {
    'use strict';

    angular.module('find-the-dude')
        .controller('DudeController', function($scope) {
            $scope.dude = 'dude!!!';
        })
        .config(function($routeProvider) {
            $routeProvider.when('/dudes', {
                controller: 'DudeController',
                templateUrl: 'scripts/dudes/views/dudes.html'
            });
        });
})();