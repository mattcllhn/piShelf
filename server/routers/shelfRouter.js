var express = require('express');
var router = express.Router();
//bring in mongoose
var mongoose = require('mongoose');
//bring in Schema
var Item = require('../models/shelfItem');

//routes
var dummyItem = new Item({
  description: 'Lovecraft collection',
  owner: 'Nate'
});

console.log(dummyItem);

module.exports = router;
