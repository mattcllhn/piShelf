var express = require('express');
var app = express();

var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/piShelf');

// var heroRouter = require('./routers/heroRouter');
// app.use('/heroes', heroRouter);
var shelfRouter = require('./routers/shelfRouter');
app.use('/shelf', shelfRouter);

var port = process.env.PORT || 3141;

app.listen(port, function(){
  console.log('server up on', port);
});

app.get('/', function(req, res){
  console.log('base hit');
  res.sendFile(path.resolve('public/views/index.html'));
})

app.use(express.static('public'));
