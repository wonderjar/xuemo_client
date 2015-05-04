angular.module('starter.controllers')

    .controller('mainTabsCtrl', ['$scope','$ionicHistory','$state','userService',function($scope,$ionicHistory,$state,userService) {
        $scope.navTo=function(state){
            $scope.currentStatus=state;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go(state,{});
        }
        $scope.currentStatus="app.learn";
    }])
