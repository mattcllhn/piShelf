console.log('script sourced');

var lock = new Auth0Lock('tADNo2G8xWUWbf4EraRWTRKP8mOBv9xB', 'natebiessener.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://natebiessener.auth0.com/v2/logout';

var myApp = angular.module('myApp', []);

myApp.controller('displayController', ['$scope', '$http', 'ShelfFactory', function($scope, $http, ShelfFactory){
  $scope.onLoad = function(){
    console.log('in onLoad');
    // check if a user's info is saved in localStorage
    if(JSON.parse(localStorage.getItem('userProfile'))){
      // if so, save userProfile as $scope.userProfile
      $scope.userProfile = JSON.parse( localStorage.getItem('userProfile'));
      console.log('loggedIn:', $scope.userProfile);
      $scope.loggedIn = true;
    }
    else{
      // if not, make sure we are logged out and empty
      emptyLocalStorage();
      $scope.loggedIn = false;
    }
  };

  $scope.onLoad();

  $scope.logIn = function(){
    lock.show(function(err, profile, token) {
      if (err) {
        console.error("auth error:", err);
      } // end error
      else {
        // save token to localStorage
        localStorage.setItem('userToken', token);
        // save user profile to localStorage
        localStorage.setItem('userProfile', JSON.stringify(profile));
        // reload page because dirtyhaxorz
        location.reload();
      } // end no error
    });
  };

  $scope.logOut = function(){
    $http({
      method:'GET',
      url: logOutUrl,
    }).then(function(data){
      // if logged out OK
      if( data.data == 'OK' ){
        // empty localStorage
        emptyLocalStorage();
        $scope.loggedIn = false;
      }
    });
  };

  $scope.shelf = [];
  //fill shelf on load
  var showShelf = function(){
    ShelfFactory.fillShelf().then(
      function(){
        console.log(ShelfFactory.shelf());
        $scope.shelf = ShelfFactory.shelf();
    });
  };
  showShelf();


  $scope.putThingOnShelf = function(){
    var thing = {
      name:$scope.itemIn,
      description: $scope.descriptionIn,
      owner: $scope.userProfile.name,
      imageUrl: $scope.imageIn
    };
    ShelfFactory.addToShelf(thing).then(showShelf);
  };

  $scope.removeThing = function(id){
    ShelfFactory.removeFromShelf(id).then(showShelf);
  };

}]);


var emptyLocalStorage = function(){
  localStorage.removeItem('userProfile');
  localStorage.removeItem('userToken');
}; // end emptyLocalStorage
