/**************************
  This class download data for training
    - crawlStandings --> download as HTML all standings for each day for past nine seasons
    - crawlFIFARatings --> download and format as JSON FIFA ratings for past nine seasons
**************************/

const request = require('request');
const cheerio = require('cheerio');
const files = require('./Files');

// Crawl the standings of seasons at x day
module.exports.crawlStandings = function() {
  const URL = 'https://www.lfp.fr/ligue1/classement?sai=&&&1&journee1=1&journee2=';
  for (var s = 100; s < 102; s++) {
    for (var j = 1; j < 39; j++) {
      var url = URL.replace(/&&&1/, s) + j;
      (function(x, y, z) {
        setTimeout(function() {
          console.log(x);
          request(x, function(error, response, body) {
            files.output('data/standings/standings_html/' + y + "-" + z + ".html", body);
          });
        }, j * 5000);
      })(url, s, j);
    }
  }

}

module.exports.crawlFIFARatings = function() {
  let urls = [{
      url: "https://www.fifaindex.com/fr/teams/fifa19_282/?league=16",
      name: '18-19'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa18_278/?league=16",
      name: '17-18'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa17_173/?league=16",
      name: '16-17'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa16_73/?league=16",
      name: '15-16'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa15_14/?league=16",
      name: '14-15'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa14_13/?league=16",
      name: '13-14'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa13_10/?league=16",
      name: '12-13'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa12_9/?league=16",
      name: '11-12'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa11_7/?league=16",
      name: '10-11'
    },
    {
      url: "https://www.fifaindex.com/fr/teams/fifa10_6/?league=16",
      name: '09-10'
    }
  ];

  for (var i = 0; i < urls.length; i++) {
    (function(x) {
      setTimeout(function() {
        files.read('data/ratings/' + urls[x].name + '.html', function(res) {
          var doc = cheerio.load(res);
          var result = [];
          for (var t = 0; t < 20; t++) {
            var object = {};
            object.name = doc('tr').eq(t + 1).find('td').eq(1).text();
            object.general = parseInt(doc('tr').eq(t + 1).find('td').eq(6).text());
            object.att = parseInt(doc('tr').eq(t + 1).find('td').eq(3).text());
            object.def = parseInt(doc('tr').eq(t + 1).find('td').eq(5).text());
            result.push(object);
          }

          files.output("data/ratings/" + urls[x].name + '.json', JSON.stringify(result));
          console.log("Saved " + urls[x].name);
        });
      }, i * 1000);
    })(i);
  }
}
