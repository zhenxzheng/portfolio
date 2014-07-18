var main = require('../main.json');

exports.view = function(req, res) {
	res.render('index', main);
}

exports.mainNav = function(req,res){
	res.json(main);
}