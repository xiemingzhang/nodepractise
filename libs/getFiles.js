var fs = require('fs');
var path = require('path');

function getFiles(filePath,pathname, callback) {
    var data = {
        Files: [],
        Dirs: []
    }
    fs.readdir(filePath, function(err, files) {
        (function iterator(i) {
            if (i == files.length) {
                callback(data)
            } else {
                var filedir = path.join(filePath, files[i]);
                fs.stat(filedir, function(err, stats) {
                    if (err) {
                        throw Error('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件  
                        var isDir = stats.isDirectory(); //是文件夹  
                        if (isFile) {
                        var isFile = stats.isFile(); //是文件  
                        var isFile = stats.isFile(); //是文件夹  
                            data.Files.push(pathname+'/'+files[i])
                        }
                        if (isDir) {
                            data.Dirs.push({'name':files[i],'url':pathname+'/'+files[i]})
                        }
                    }
                    iterator(i + 1);
                });
            }
        })(0);
    })

}
exports.getFiles = getFiles;