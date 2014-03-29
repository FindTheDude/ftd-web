angular.module('youlearn').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('scripts/dudes/views/dudes.html',
    "<p>hola</p>"
  );


  $templateCache.put('scripts/header/views/nav.html',
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "        <button type=\"button\" class=\"navbar-toggle\">\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "        </button>\n" +
    "        <a class=\"navbar-brand\" href=\"#\">Find The Dude!!!</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "        <ul class=\"nav navbar-nav\">\n" +
    "            <li class=\"active\">\n" +
    "                <a href=\"#\">\n" +
    "                    <i class=\"fa fa-home\"></i>&nbsp;Dudes!\n" +
    "                </a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a href=\"#\">\n" +
    "                    <i class=\"fa fa-users\"></i>&nbsp;Find them!\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <ul class=\"nav navbar-nav pull-right\">\n" +
    "            <li>\n" +
    "                <a href=\"#\">\n" +
    "                    Log Out\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('scripts/login/views/login.html',
    "<button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"login()\">Sign in with facebook</button>"
  );

}]);
