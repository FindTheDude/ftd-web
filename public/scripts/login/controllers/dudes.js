(function() {
    'use strict';

    angular.module('find-the-dude')
        .controller('DudesController', function($scope, $dudes) {
            $scope.refresh = function() {
                $dudes.refresh();
            };

            $scope.list = function() {
                $dudes.list();
            };
        })
        .config(function($routeProvider) {
            $routeProvider.when('/duddes', {
                controller: 'DudesController',
                templateUrl: 'scripts/dudes/views/dudes.html',
                restricted: false
            });
        });
})();