var about = require('../about.json');

exports.view = function(req,res) {
	res.json(about);
}