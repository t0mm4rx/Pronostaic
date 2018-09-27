const files = require('./Files');

module.exports.generate = function () {

    files.read('data/resultats/17-18.json', function (res) {
      var season = JSON.parse(res);
      console.log(season);
      var standing = [];
      for (var j = 0; j < 38; j++) {

          var day = [];
          for (var t = 0; t < 20; t++) {

          }

      }
    });

}
