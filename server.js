var express = require('express');

var app = express();

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

console.log(__dirname);
app.use('/', express.static(__dirname + '/public/'));

app.listen(9000, function () {
  console.log('Server running');
});