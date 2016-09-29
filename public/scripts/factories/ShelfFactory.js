myApp.factory('ShelfFactory', ['$http', function($http){
  console.log('in shelfFactory');

  var shelfItems;

  var fillShelf = function(){
    return $http({
      method: 'GET',
      url: '/shelf/items'
    }).then(function(results){
      console.log('filling shelf');
      shelfItems = results.data;
    }, function(response){
      console.log('err, check server logs');
    });
  };

  var addToShelf = function(objectToSend){
    return $http({
      method: 'POST',
      url: '/shelf/items',
      data: objectToSend
    }).then(function(results){
      console.log('saved');
    }, function(response){
      console.log('err, check server logs');
    });
  };

  var removeFromShelf = function(id){
    return $http({
      method: 'DELETE',
      url: '/shelf/items?id=' + id
    }).then(function(results){
      console.log('removed');
    }, function(response){
      console.log('err, check server logs');
    });
  }

  return {
    shelf: function(){
      return shelfItems;
    },
    fillShelf: fillShelf,
    addToShelf: addToShelf,
    removeFromShelf: removeFromShelf
  };
}]);
