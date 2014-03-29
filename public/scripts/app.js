(function() {
    angular.module('find-the-dude', ['ngRoute', 'ui.bootstrap', 'facebook', 'ngResource', 'ivpusic.cookie'])
        .config($facebookProvider, $routeProvider, $httpProvider)
})();