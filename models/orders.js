var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema ({
		name : String, 
		phone: String,
		email: String,
		address: String,
		status : Number,
		date: Number,
		total : Number,
		cart : String


});

mongoose.model('orders', ordersSchema);