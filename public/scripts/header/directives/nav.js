(function() {
    'use strict';

    angular.module('find-the-dude')
        .directive('nav', function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: 'scripts/header/views/nav.html',
                link: function(scope) {
                    scope.dude = 'dude';
                }
            };
        });
})();