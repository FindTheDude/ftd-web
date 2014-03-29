(function() {
    'use strict';

    angular.module('find-the-dude')
        .directive('header', function() {
            return {
                restrict: 'C',
                replace: false,
                templateUrl: 'scripts/header/views/header.html',
                link: function(scope) {
                    scope.dude = 'dude';
                }
            };
        });
})();