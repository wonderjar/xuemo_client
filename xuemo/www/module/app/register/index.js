angular.module('starter.controllers')

    .controller('registerCtrl', ['$scope','courseService','$state','URL_CONFIG','$http',
        function($scope,courseService,$state,URL_CONFIG,$http) {
            var routerParams=$state.params;
            var urlStatus=URL_CONFIG.status;
            var normalHost=URL_CONFIG.host.normalHost;
        }])
