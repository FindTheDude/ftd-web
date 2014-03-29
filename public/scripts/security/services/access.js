(function() {
    'use strict';

    angular.module('find-the-dude')
        .directive('access', function($rootScope, $auth) {
            return {
                transclude: 'element',
                priority: 1000,
                terminal: true,
                restrict: 'A',
                compile: function(templateElement, templateAttrs, transclude) {
                    return {
                        post: function(scope, element) {
                            var childElement, childScope;
                            var check = function () {
                                var auth = $auth.isLoggedIn();
                                if(childElement) {
                                    childElement.remove();
                                    childElement = undefined;
                                }
                                if (childScope) {
                                    childScope.$destroy();
                                    childScope = undefined;
                                }

                                if(auth) {
                                    childScope = scope.$new();
                                    transclude(childScope, function(clone) {
                                        //implementation based on ngIf angular 1.2
                                        childElement = clone;
                                        var afterNode = element && element[element.length - 1];
                                        var parentNode = element.parent() && element.parent()[0] ||
                                            afterNode && afterNode.parentNode;
                                        // IE does not like undefined so we have to pass null.
                                        var afterNextSibling = (afterNode && afterNode.nextSibling) || null;
                                        for(var i = 0; i < clone.length; i++) {
                                            parentNode.insertBefore(clone[i], afterNextSibling);
                                        }
                                    });
                                }
                            };
                            $rootScope.$watch('user', check);
                            check();
                        }
                    };
                }
            };
        });
}());