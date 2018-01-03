var server = require("./serve");
var router = require("./route");

server.start(router.route);