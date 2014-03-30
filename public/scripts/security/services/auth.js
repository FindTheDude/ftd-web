(function() {
    'use strict';

    angular.module('find-the-dude')
        .factory('$auth', function($facebook, ipCookie, $q, $location, $rootScope, $login) {
            $rootScope.user = ipCookie('user');

            var login = function(response) {
                if(response.status === 'connected') {
                    ipCookie('user', {fullName: 'Angel L. Villalain', 'userName': 'angel.villalain', picture: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/c38.8.103.103/1779207_10100311295035269_252880975_a.jpg'},
                        {expires: response.authResponse.expiresIn/60, expirationUnit: 'minutes'});
                    $location.path('/dudes');
                    $rootScope.user = ipCookie('user');
                    return response.authResponse;
                }
                return $q.reject(response);
            };

            var finish = function(response) {
                console.log(response);
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