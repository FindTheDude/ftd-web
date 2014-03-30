(function() {
    'use strict';

    angular.module('find-the-dude')
        .factory('$login', function($http) {
            return {
                login: function(data) {
                    return $http({method: 'POST', url: 'api/auth/facebook',
                        params: {accessToken: data.accessToken, userId: data.userID}});
                }
            };
        });
})();