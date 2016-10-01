var express = require('express');
var app = express();
var path = require('path');
var cookieSession = require('cookie-session')
//var forever = require('forever-monitor');

app.use(express.static('public'));



app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/gallery', function (req, res) {
     res.sendFile(path.join(__dirname+'/gallery.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});