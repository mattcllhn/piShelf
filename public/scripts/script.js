console.log('script sourced');

var myApp = angular.module('myApp', []);

myApp.controller('displayController', ['$scope', 'ShelfFactory', function($scope, ShelfFactory){
  console.log('ng');

  ShelfFactory.fillShelf().then(
    function(){
      console.log(ShelfFactory.shelf());
    });
}]);
