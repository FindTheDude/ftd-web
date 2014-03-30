(function() {
    'use strict';

    angular.module('find-the-dude')
        .controller('DudeController', function($scope, $auth, $dudes) {
            $scope.user = $auth.user();
            $scope.refresh = function() {
                $dudes.refresh().then(function(data) {console.log(data); });
            };
        })
        .config(function($routeProvider) {
            $routeProvider.when('/dudes', {
                controller: 'DudeController',
                templateUrl: 'scripts/dudes/views/dudes.html',
                restricted: true
            });
        });
})();