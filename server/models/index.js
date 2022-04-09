const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
mongoose.set('useFindAndModify', false);
//Listen status connect database
mongoose.connection.on('error', function() {
	console.log('Connect to database error!');
});
mongoose.connection.once('open', function() {
	console.log('Connect to database success!');
	console.log(process.env.MONGODB_URL)
});

const db = {};
db.Orders = require('./order.js');
db.Products = require('./product.js');
db.Users = require('./user.js');
db.Posts = require('./post/post');
db.CarePostMapping = require('./post/care-post-mapping');
db.Messages = require('./message');
module.exports = db;