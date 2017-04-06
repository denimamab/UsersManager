'use strict';

angular.module('app', [
    'ngRoute',
    'app.databind',
    'app.services',
    'app.filters',
])
.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .otherwise('/')
}])