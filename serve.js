var http = require("http");
var url = require("url");

function start(route) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        route(pathname, req, res);
    }

    http.createServer(onRequest).listen(3000);
    console.log("Server running on 3000");
}

exports.start = start;