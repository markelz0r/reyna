var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var path = require('path');
var cookieSession = require('cookie-session')
//var forever = require('forever-monitor');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/gallery', function (req, res) {
     res.sendFile(path.join(__dirname+'/gallery.html'));
});

app.post('/checkout', function (req, res) {
     res.sendFile(path.join(__dirname+'/checkout.html'));
     console.log('current order is:'+req.body);
});


app
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});