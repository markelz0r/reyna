var express = require('express');
var bodyParser     =        require("body-parser");
var app = express();
var path = require('path');
var cookieSession = require('cookie-session');
var mongodb = require('mongodb');
var mongoose = require ('mongoose');
var ObjectID = require('mongodb').ObjectID;
var Handlebars = require('handlebars');
//var forever = require('forever-monitor');
var fs = require ('fs');



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/reyna1')
var conn = mongoose.connection;

app.set('view engine', 'hbs');


//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});



app.get('/', function (req, res) {
     res.sendFile(path.join(__dirname+'/index.html'));
});



app.get('/gallery', function (req, res) {
     res.sendFile(path.join(__dirname+'/gallery.html'));
});

app.get('/checkout', function (req, res) {
     res.sendFile(path.join(__dirname+'/checkout.html'));
    
});

app.get('/deleteOrder/:id', function (req, res) {
  mongoose.model('carts')
  .findOne({ '_id': req.params.id })
  .remove()
  .exec();

  mongoose.model('carts')
  .find()
.populate('_order')
.exec(function (err, carts) {
  if (err) return handleError(err);
   res.redirect('/admin');
 res.render(path.join(__dirname+'/templates/admin.hbs'), carts);
 //res.send(carts);
});


});


app.get('/testDB/:id', function (req, res) {
 
mongoose.model('carts')
//.findOne({ '_id': req.params.id })
.find()
.populate('_order')
.exec(function (err, carts) {
  if (err) return handleError(err);
 res.render(path.join(__dirname+'/templates/admin.hbs'), carts);
 //res.send(carts);
});

});



app.get('/admin', function (req, res) {
 
mongoose.model('carts')
//.findOne({ '_id': req.params.id })
.find()
.populate('_order')
.exec(function (err, carts) {
  if (err) return handleError(err);
 res.render(path.join(__dirname+'/templates/admin.hbs'), carts);
 //res.send(carts);
});

});



app.post ('/sendCheckout', function (req, res) {
var objectId = new ObjectID();
console.log('name - '+req.body.firstname);
console.log('surname - '+req.body.lastname);
console.log('phone - '+req.body.phone);
console.log('email - '+req.body.email);
console.log('ObjectID - '+objectId);
a = JSON.parse(req.body.cart);

var cartsData = {
  _order : objectId,
  cart : a
 }


var ordersData = {
  _id : objectId,
  firstname : req.body.firstname,
  lastname : req.body.lastname,
  phone : req.body.phone,
  email : req.body.email,
  status : 0,
  //cart : cartStr
};

conn.collection('orders').insert(ordersData);
conn.collection('carts').insert(cartsData);

});





app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});