var projects = require('../projects.json');

exports.view = function(req,res) {
	res.json(projects);
}

exports.projectInfo = function(req,res) {
	var projectID = req.params.id;
	projectID = parseInt(projectID);

	var project = projects[projectID-1];
	res.json(project);
}