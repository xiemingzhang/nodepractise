var fs = require('fs');
var ejs = require('ejs');

function readejs(fileUrl, pagedata, res) {

    fs.readFile(fileUrl, function(err, data) {
        if (err) { //一般情况下都是路径引起的错误
            res.writeHead(404, { "Content-type": "text/html;charset=UTF-8" });
            res.end("404，页面未找到，page not found");
        }

        var template = data.toString(); //拿到加载的模板

        var html = ejs.render(template, pagedata);
        res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" });
        res.end(html);

    });

}

exports.readejs = readejs;