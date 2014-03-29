(function() {
    'use strict';

    angular.module('find-the-dude')
        .factory('$auth', function($facebook, ipCookie, $q, $location, $rootScope) {
            $rootScope.user = ipCookie('user');

            var login = function(response) {
                if(response.status === 'connected') {
                    ipCookie('user', response, {expires: response.authResponse.expiresIn/60, expirationUnit: 'minutes'});
                    $location.path('/dudes');
                    $rootScope.user = ipCookie('user');
                }
                return $q.reject(response);
            };

            return {
                isLoggedIn: function() {
                    return $rootScope.user !== undefined;
                },
                login: function() {
                    $facebook.login().then(login);
                },
                logout: function() {
                    $facebook.logout().then(function() {
                        $location.path('/login');
                    });
                }
            };
        });
})();