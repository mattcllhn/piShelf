var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  description: {type: String, required: true},
  owner: {type: String, required: true},
  //required:false not required, including for readability
  imageUrl: {type: String, required: false},
  creationDate: {type: Date, default: Date.now, required:false}
});

var Item = mongoose.model('shelfItems', itemSchema);

module.exports = Item;
