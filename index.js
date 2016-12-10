var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var path = require('path');
var cookieSession = require('cookie-session');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var Handlebars = require('handlebars');
var multer  = require('multer');
var crypto = require('crypto');
var mime = require('mime');
//var forever = require('forever-monitor');
var fs = require('fs');
var hbs = require('hbs');



var _ = require('underscore');
var Promise = require('bluebird');



var api = require('instagram-node').instagram();

//521299889.1677ed0.2cdbfedf4c83428bb0cdabc4d1c5e15a
api.use({
  access_token: "521299889.8a118ea.643801a122584d13937c23e39075d17c",
  client_id: "8a118ea7c79942c9a0017317d47d13c4",
  client_secret: "312bd4403a5e414d9f373c0b22b78f7e"
});



app.set('view engine', 'hbs');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/item_img/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.tohString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });


hbs.registerPartials(__dirname + '/templates/partials/');
function loadPartials() {
  hbs.registerPartials(__dirname + '/templates/partials/');
}




app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/reyna1')
var conn = mongoose.connection;



//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});






var redirect_uri = 'http://markel.info/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['public_content'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};


//This is where users go
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/handleauth', exports.handleauth);




app.get('/inst/', function(req, res) {

res.sendFile(__dirname + '/public/static/gallery.html');

});



app.get('/', function(req, res) {
    loadPartials();
    mongoose.model('items')
        //.findOne({ '_id': req.params.id })
        .find()
        .exec(function(err, items) {
            if (err) return handleError(err);
            res.render(path.join(__dirname + '/templates/index.hbs'), items);
            //res.send(items);
        });

});


app.get('/gallery', function(req, res) {
  loadPartials();
    api.user_media_recent('2123502833',{count : 20}, function(err, medias, pagination, remaining, limit) {
      if (err) return res.send(err);
        res.render(path.join(__dirname + '/templates/lookbook.hbs'), medias);
    

    });


    
});

app.get('/checkout', function(req, res) {
    loadPartials();
    res.render(path.join(__dirname + '/templates/checkout.hbs'));

});

app.get('/deleteOrder/:id', function(req, res) {
    mongoose.model('carts')
        .findOne({
            '_id': req.params.id
        })
        .remove()
        .exec();
    res.redirect('/admin');


});

app.get('/deleteItem/:id', function(req, res) {
    mongoose.model('items')
        .findOne({
            '_id': req.params.id
        })
        .remove()
        .exec();

    res.redirect('/admin');
    // res.render(path.join(__dirname+'/templates/admin.hbs'), carts);
    //res.send(carts);



});




app.get('/testDB/:id', function(req, res) {

    mongoose.model('carts')
        //.findOne({ '_id': req.params.id })
        .find()
        .populate('_order')
        .exec(function(err, carts) {
            if (err) return handleError(err);
            res.render(path.join(__dirname + '/templates/admin.hbs'), carts);
            //res.send(carts);
        });

});



app.get('/admin', function(req, res) {

    mongoose.model('carts')
        //.findOne({ '_id': req.params.id })
        .find()
        .populate('_order')
        .exec(function(err, carts) {
            if (err) return handleError(err);

            mongoose.model('items')
                .find()
                .exec(function(err, items) {

                    var data = {
                        carts: carts,
                        items: items
                    }
                    res.render(path.join(__dirname + '/templates/admin.hbs'), data);
                    //res.send(data);
                });
        });
});




app.post('/addShopItem', upload.array('image_up'), function (req, res, next) {

  imgArr = [];
for (var i = req.files.length - 1; i >= 0; i--) {
  imgArr[i] = req.files[i].filename
}

  var itemsData = {
        title: req.body.title,
        price: req.body.price,
        image_name: imgArr
    };
    
    

    

    conn.collection('items').insert(itemsData);
    res.redirect('/admin');
});

app.get('/deletePhoto/:id', function(req, res) {
  mongoose.model('items')
  .findOne({image_name : req.params.id}, function (err, object) {
  if (err) return handleError(err);
  var index = object.image_name.indexOf(req.params.id);
  if (index != -1)
      object.image_name.splice(index,1);
  object.save(function (err, updatedObj) {
    if (err) return handleError(err);
    //res.send(updatedObj);
    res.redirect('/admin');
 });
        
 });
   });

app.post('/sendCheckout', function(req, res) {
    var objectId = new ObjectID();
    console.log('name - ' + req.body.name);
    console.log('phone - ' + req.body.phone);
    console.log('email - ' + req.body.email);
    console.log('address - ' + req.body.address);
    console.log('ObjectID - ' + objectId);
    a = JSON.parse(req.body.cart);

    var cartsData = {
        _order: objectId,
        cart: a
    }
 

    var ordersData = {
      _id: objectId,
      name : req.body.name, 
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      status : 0,
 
    };

    conn.collection('orders').insert(ordersData);
    conn.collection('carts').insert(cartsData);

});




app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});