(function() {
    'use strict';

    angular.module('find-the-dude')
        .controller('DudeController', function($scope, $auth) {
            $scope.user = $auth.user();
        })
        .config(function($routeProvider) {
            $routeProvider.when('/dudes', {
                controller: 'DudeController',
                templateUrl: 'scripts/dudes/views/dudes.html',
                restricted: true
            });
        });
})();