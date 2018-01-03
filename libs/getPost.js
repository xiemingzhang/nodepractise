var formidable = require('formidable');
var sd = require("silly-datetime");
var fs = require('fs');
var path = require('path');

function getPost(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./static/images";
    form.parse(req, function(err, fields, files) {

        var ran = parseInt((Math.random() * 10000).toFixed(0));
        var newDate = sd.format(new Date(), "YYYYMMDDHHmmss");
        var extname = path.extname(files.file.name); //传入URL或文件名
        var oldpath = path.resolve(__dirname, '..') + "/" + files.file.path; //获取之前的URL

        if (fields.path) {

            var _newpath = path.resolve(__dirname, '..') + "/static/images/" + fields.path;

            function mkdirsSync(dirname) {
                if (fs.existsSync(dirname)) {
                    var newpath = _newpath + '/' + fields.name + newDate + ran + extname;
                    return true;
                } else {
                    if (mkdirsSync(path.dirname(dirname))) {
                        fs.mkdirSync(dirname);
                        return true;
                    } else {
                        var newpath = _newpath + '/' + fields.name + newDate + ran + extname;
                    }
                }
            }
            mkdirsSync(_newpath)
            var newpath = _newpath + '/' + fields.name + newDate + ran + extname;

        } else {

            var newpath = path.resolve(__dirname, '..') + "/static/images/" + fields.name + newDate + ran + extname;
        }

        console.log(newpath)

        fs.rename(oldpath, newpath, function(err) {
            if (err) {
                throw Error("改名字没改成功!");
            }
        });

        res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" })
        res.end('<a href="http://localhost:3000">返回首页</a>')
    })
}

exports.getPost = getPost;