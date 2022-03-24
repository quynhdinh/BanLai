const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGODB_URL);

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
db.City = require('./location/city.js');
db.District = require('./location/district.js');
db.Category = require('./category/category');
db.SubCategory = require('./category/subcategory');
module.exports = db;