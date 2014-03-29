angular.module('youlearn').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('scripts/dudes/views/dudes.html',
    "<p>hola</p>"
  );


  $templateCache.put('scripts/login/views/login.html',
    "<button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"login()\">Sign in with facebook</button>"
  );

}]);
