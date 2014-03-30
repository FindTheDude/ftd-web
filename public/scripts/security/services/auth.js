(function() {
    'use strict';

    angular.module('find-the-dude')
        .factory('$auth', function($facebook, ipCookie, $q, $location, $rootScope, $login) {
            $rootScope.user = ipCookie('user');

            var login = function(response) {
                if(response.status === 'connected') {
                    return response.authResponse;
                }
                return $q.reject(response);
            };

            var finish = function(response) {
                ipCookie('user', response.data,
                    {expires: response.authResponse.expiresIn/60, expirationUnit: 'minutes'});
                $location.path('/dudes');
                $rootScope.user = ipCookie('user');
            };

            return {
                user: function() {
                    return $rootScope.user;
                },
                isLoggedIn: function() {
                    return ipCookie('user')!== undefined && $rootScope.user !== undefined;
                },
                login: function() {
                    $facebook.login().then(login).then($login.login).then(finish);
                },
                logout: function() {
                    $facebook.logout().then(function() {
                        $rootScope.user = undefined;
                        $location.path('/');
                    });
                }
            };
        });
})();