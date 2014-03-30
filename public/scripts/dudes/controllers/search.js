(function() {
    'use strict';

    angular.module('find-the-dude')
        .controller('SearchController', function() {

        })
        .config(function($routeProvider) {
            $routeProvider.when('/search', {
                controller: 'SearchController',
                templateUrl: 'scripts/dudes/views/search.html'
            });
        });
})();