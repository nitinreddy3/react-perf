#! /usr/local/bin/node

var path = require('path');
var fs = require('fs');
var static = require('node-static');
var prepareDBMonster = require('./dbmonster');

var version = process.argv[2] || '0.13.0';
var binDir = process.argv[3] || path.join(__dirname, 'bin');
if (!fs.existsSync(binDir)) {
	fs.mkdirSync(binDir);
}

prepareDBMonster(version, binDir, function(resultDir) {
	var server = require('http').createServer(function(request, response) {
		request.addListener('end', function() {
			new static.Server(resultDir).serve(request, response);
		}).resume();
	}).listen(8080);
	console.log('Started server');
});