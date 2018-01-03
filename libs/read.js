var fs = require('fs');

function getMime(extname, callback) { //extname：后缀名

    fs.readFile(__dirname + "/mime.json", function(err, data) { //这里读取问你件是异步的，所以在这里不能直接return返回
        if (err) {
            throw Error("找不到mime.json文件")
        }
        var mimeJSON = JSON.parse(data); //将字符串转为JSON格式（JSON文件不能有任何注释存在）
        var mime = mimeJSON[extname];
        callback(mime);

    });

    return "text/html";

}

function read(fileUrl, extname, res) {

    fs.readFile(fileUrl, function(err, data) {
        if (err) { //一般情况下都是路径引起的错误
            res.writeHead(404, { "Content-type": "text/html;charset=UTF-8" });
            res.end("404，页面未找到，page not found");
        }

        getMime(extname, function(mime) {
            res.writeHead(200, { "Content-type": mime });
            res.end(data);
        });

    });

}
exports.read = read;