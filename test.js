var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req, res) {
    var pathname = url.parse(decodeURI(req.url)).pathname;
    console.log(pathname)
    var filePath = "./" + path.normalize(pathname);
    console.log(filePath)
    res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" })
    res.end("dd")
}).listen(3001)