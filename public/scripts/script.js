console.log('script sourced');

var myApp = angular.module('myApp', []);

myApp.controller('piShelfController', ['$scope', '$http', function($scope, $http){
  console.log('ng');
}]);
