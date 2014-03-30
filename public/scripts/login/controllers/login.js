(function() {
    'use strict';

    angular.module('find-the-dude')
        .controller('LoginController', function($scope, $auth) {
            $scope.login = function() {
                $auth.login();
            };
        })
        .config(function($routeProvider) {
            $routeProvider.when('/login', {
                controller: 'LoginController',
                templateUrl: 'scripts/login/views/login.html'
            });
        });
})();