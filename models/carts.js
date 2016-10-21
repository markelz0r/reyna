var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var cartsSchema = new Schema ({
		_order : { type: Schema.Types.ObjectId, ref: 'orders' },
		cart: Array


});

var Carts = mongoose.model('carts', cartsSchema);