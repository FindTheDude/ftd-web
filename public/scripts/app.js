(function () {
    'use strict';

    angular.module('find-the-dude', ['ngRoute', 'ui.bootstrap', 'facebook', 'ngResource', 'ivpusic.cookie'])
        .config(function ($routeProvider, $httpProvider, $facebookProvider, $locationProvider) {

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            var interceptors = ['$q', '$location', function ($q, $location) {
                var success = function (response) {
                    return response;
                };

                var error = function (response) {
                    if (response.status === 401) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                };

                return function (promise) {
                    return promise.then(success, error);
                };
            }];

            $httpProvider.interceptors.push(interceptors);

            $locationProvider.html5Mode(true);

            $facebookProvider.init({
                appId: '595544040538871'
            });

            $routeProvider.otherwise({
                redirectTo: '/dudes'
            });
        })
        .run(function ($rootScope, $auth, $location) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if(next.restricted && !$auth.isLoggedIn()) {
                    $location.path('/login');
                }
            });
        });
})();