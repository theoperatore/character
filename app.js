var express = require('express');
var app = module.exports.app = exports.app = express();

app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/build/index.html');
});

var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on http://%s:%s', host, port);
});
