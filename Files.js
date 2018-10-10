var fs = require('fs');

module.exports.output = function(filename, content) {
  fs.writeFileSync(filename, content, 'utf8');
}

module.exports.read = function(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      exit(0);
    }
    callback(data);
  });
}

module.exports.readSync = function (filename) {
  return fs.readFileSync(filename).toString();
}

module.exports.exists = function (file) {
    return fs.existsSync(file);
}
