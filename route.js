 var path = require('path');
var readejs = require('./libs/readejs');
var read = require('./libs/read');
var getFiles = require('./libs/getFiles');
var getPost = require('./libs/getPost');

function route(pathname, req, res) {

    if (pathname == "/favicon.ico") {
        return
    } else if (pathname == '/' || pathname == '/photo' || pathname == '/index') {
        var filePath = "./" + path.normalize("./static/images");
        getFiles.getFiles(filePath,'./static/images', getdata);
        function getdata(data) {
            readejs.readejs('./views/index.ejs', data, res);
        }
    } else if (pathname == '/upload') {
        read.read('./views/upload.ejs', '.html', res)
    } else if (pathname == '/dopost' && req.method.toLowerCase() == 'post') {
        getPost.getPost(req,res)

    } else if (pathname.indexOf('.') == -1) {
        var filePath = "./" + path.normalize(pathname);
        getFiles.getFiles(filePath, pathname, getdata);       
        function getdata(data) {
            readejs.readejs('./views/index.ejs', data, res);
        }
    } else {
        var filePath = "./" + path.normalize(pathname);
        var extname = path.extname(pathname); //extname：获取后缀名
        read.read(filePath, extname, res);
    }
}

exports.route = route;