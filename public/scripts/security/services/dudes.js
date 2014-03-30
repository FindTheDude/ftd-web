(function () {
    'use strict';

    angular.module('find-the-dude')
        .factory('$dudes', function ($http) {
            return {
                refresh: function () {
                    console.log('Refreshing contacts.');
                    return $http({method: 'POST', url: '/friends'});
                },

                list: function () {
                    console.log('Getting dude list.');
                    return $http({method: 'GET', url: '/dudes'});
                }
            };
        });
})();