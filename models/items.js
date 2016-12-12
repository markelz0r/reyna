var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var itemsSchema = new Schema ({
		title : String, 
		price : Number,
		image_name :  Array



});

mongoose.model('items', itemsSchema);