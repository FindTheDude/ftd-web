(function() {
    'use strict';

    angular.module('find-the-dude')
        .directive('nav', function($location, $auth) {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: 'scripts/header/views/nav.html',
                link: function(scope) {
                    scope.isActive = function(path) {
                        return path === $location.path();
                    };

                    scope.logout = function() {
                        $auth.logout();
                    };
                }
            };
        });
})();