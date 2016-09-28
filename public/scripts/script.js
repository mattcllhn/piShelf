console.log('script sourced');

var lock = new Auth0Lock( 'tADNo2G8xWUWbf4EraRWTRKP8mOBv9xB', 'natebiessener.auth0.com');
// log out url, from Auth0
var logOutUrl = 'https://natebiessener.auth0.com/v2/logout';

var myApp = angular.module('myApp', []);

myApp.controller('displayController', ['$scope', '$http', 'ShelfFactory', function($scope, $http, ShelfFactory){
  $scope.loggedIn = false;

  $scope.logIn = function(){
    lock.show( function( err, profile, token ) {
      if (err) {
        console.error( "auth error: ", err);
      } // end error
      else {
        // save token to localStorage
        localStorage.setItem( 'userToken', token );
        // save user profile to localStorage
        localStorage.setItem( 'userProfile', JSON.stringify( profile ) );
                              // reload page because dirtyhaxorz
                              // location.reload();

      } // end no error
    }); //end lock.show
    $scope.loggedIn = true; //<--FIX THIS, RUNS IF(ERR), DOES NOT WORK AS INTENDED INSIDE ELSE BLOCK
  };

  $scope.logOut = function(){
    $http({
      method:'GET',
      url: logOutUrl,
    }).then( function( data ){
      // if logged out OK
      if( data.data == 'OK' ){
        // empty localStorage
        emptyLocalStorage();
        $scope.loggedIn = false;
      }
    })

  };
  console.log('ng');

  $scope.shelf = [];
  //fill shelf on load
  ShelfFactory.fillShelf().then(
    function(){
      console.log(ShelfFactory.shelf());
      $scope.shelf = ShelfFactory.shelf();
    });

    var putThingOnShelf = function(){
      var thing = {
        description: $scope.descriptionIn,
        owner: undefined, //!!---TAKE FROM AUTH0
        imageUrl: $scope.imageIn
      };
      return ShelfFactory.addToShelf(thing);
    };

}]);


var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage
