(function() {
    'use strict';

    angular.module('find-the-dude')
        .factory('$login', function($http) {
            return {
                login: function(data) {
                    return $http({method: 'POST', url: 'api/auth/facebook',
                        params: {accessToken: data.accessToken, userId: data.userID},
                        transformResponse: function(stringResponse) {
                            var data = angular.fromJson(stringResponse);
                            data.expires = new Date(data.expires);
                            return data;
                        }});
                }
            };
        });
})();