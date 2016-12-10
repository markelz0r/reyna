var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema ({
		username : String, 
		password : String


});

mongoose.model('users', usersSchema);