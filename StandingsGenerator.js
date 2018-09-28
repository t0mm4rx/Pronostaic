const files = require('./Files');
const cheerio = require('cheerio');

module.exports.generate = function() {


  for (var s = 100; s < 102; s++) {
    var season = [];
    for (var j = 1; j < 39; j++) {

      (function(x, y) {

        files.read('data/standings/standings_html/' + x + '-' + y + '.html', function(res) {
          var doc = cheerio.load(res);
          var res = [];
          for (var t = 0; t < 20; t++) {
            var object = {};
            object.position = t + 1;
            object.diff = parseInt(doc('tr').eq(t + 1).find('.diff').text());
            object.name = doc('tr').eq(t + 1).find('.club').text();
            object.name = object.name.replace(/\t/g, '');
            object.name = object.name.replace(/\n/g, '');
            object.name = object.name.replace(/ /g, '');
            res.push(object);
          }
          season.push(res);
          if (y >= 38) {
            files.output('data/standings/' + x + '.json', JSON.stringify(season));
          }
        });
      })(s, j);

    }
  }


}
