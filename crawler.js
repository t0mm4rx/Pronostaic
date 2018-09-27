const request = require('request');
const cheerio = require('cheerio');
const files = require('./Files');

// Crawl the standings of seasons at x day
module.exports.crawlStandings = function() {
    const URL = 'http://www.foot-national.com/&&&1-classement-ligue1-type-general-journees-1-&&&2.html';

    for (var i = 0; i < 1; i++) {
        var url = URL.replace(/&&&1/, '2017-2018');
        var url = URL.replace(/&&&2/, i);
        request(URL, function(error, response, body) {
            if (error) {
              console.error(error);
              exit(0);
            }
            files.output('Result.html', body);
            var doc = cheerio.load(body);
            console.log(doc('#classement').html());
            var res = [];
            for (var x = 0; x < 20; x++) {
                res.push({
                  standing: parseInt(doc("#classement tbody tr .t0").eq(i + 1).text()),
                  goal_average: doc("#classement tbody tr .t10").eq(i + 1).text()
                });
            }
            console.log(res);

        });
    }

}
