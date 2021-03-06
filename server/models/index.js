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
db.Users = require('./user.js');
db.Posts = require('./post');
db.CarePostMapping = require('./care-post-mapping');
db.Messages = require('./message');
db.ViewedPostMapping = require('./viewed-post-mapping');
module.exports = db;