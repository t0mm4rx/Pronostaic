var fs = require('fs');

module.exports.output = function(filename, content) {
  fs.writeFile(filename, content, function(err) {
    if (err) {
      return console.log(err);
    }
  });
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
