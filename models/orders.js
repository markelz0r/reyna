var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema ({
		firstname : String, 
		lastname : String,
		phone: String,
		email: String,
		status : Number,
		cart : String


});

mongoose.model('orders', ordersSchema);