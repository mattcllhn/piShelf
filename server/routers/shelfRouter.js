var express = require('express');
var router = express.Router();
//bring in mongoose
var mongoose = require('mongoose');
//bring in Schema
var Item = require('../models/shelfItem');

// var dummyItem = new Item({
//   description: 'Lovecraft collection',
//   owner: 'Nate'
// });
//routes

router.get('/items', function(req, res){
  console.log('in items get');
  Item.find({}, function(err, results){
    if (err) {
      console.log('db err:', err);
      res.sendStatus(500);
    }
    else {
      console.log('get successful');
      res.send(results);
    }
  })
});//end /items get

router.post('/items', function(req, res){
  console.log('in items post');
  var newItem = new Item({
    description: req.body.description,
    owner: req.body.owner,
    imageUrl: req.body.imageUrl
  });
  newItem.save(function(err){
    if (err) {
      console.log('db err:', err);
      res.sendStatus(500);
    }
    else {
      console.log('item saved');
      res.sendStatus(200);
    }
  });
});//end /items post

router.delete('/items', function(req, res){
  console.log('in items delete');
  Item.findByIdAndRemove(req.query.id, function(err, result){
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    else {
      console.log('item deleted');
      res.send(result);
    }
  });
});//end /items delete

// console.log(dummyItem);

module.exports = router;
