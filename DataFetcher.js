const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const files = require('./Files');

module.exports.seasons = [];

module.exports.load = function() {
  // Loading past seasons data
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/09-10.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/10-11.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/11-12.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/12-13.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/13-14.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/14-15.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/15-16.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/16-17.json', 'utf8')));
  module.exports.seasons.push(JSON.parse(fs.readFileSync('data/resultats/17-18.json', 'utf8')));

  // Sorting them by date
  for (var i = 0; i < module.exports.seasons.length; i++) {
    module.exports.seasons[i].sort(function(a, b) {
      var date1 = new Date(a.Date).getTime();
      var date2 = new Date(b.Date).getTime();
      return date1 - date2;
    });
  }
}

module.exports.getLastFiveResultsAt = function(date, team) {
  var time = new Date(date).getTime();
  // return team + ' on ' + date;
  var results = [];
  // Get the last season with data for this team
  for (var i = module.exports.seasons.length - 1; i > 0; i--) {
    var season = module.exports.seasons[i];
    if (JSON.stringify(season).indexOf(team.toString()) != -1) {
      for (var x = season.length - 1; x > 0; x--) {
        if (new Date(season[x].Date).getTime() < time) {
          if (season[x].AwayTeam === team.toString() || season[x].HomeTeam === team.toString()) {
            results.push(season[x]);
            if (results.length >= 5) {
              return results;
            }
          }
        }
      }
    }
  }
  return [];
}

module.exports.getLastFiveResultsAgainstAt = function(date, team, opponent) {
  var time = new Date(date).getTime();
  // return team + ' on ' + date;
  var results = [];
  // Get the last season with data for this team
  for (var i = module.exports.seasons.length - 1; i > 0; i--) {
    var season = module.exports.seasons[i];
    if (JSON.stringify(season).indexOf(team.toString()) != -1) {
      for (var x = season.length - 1; x > 0; x--) {
        if (new Date(season[x].Date).getTime() < time) {
          if ((season[x].HomeTeam === team.toString() && season[x].AwayTeam === opponent.toString()) || (season[x].AwayTeam === team.toString() && season[x].HomeTeam === opponent.toString())) {
            results.push(season[x]);
            if (results.length >= 5) {
              return results;
            }
          }
        }
      }
    }
  }
  return [];
}

module.exports.getLastFiveResults = function(team, callback) {
  // https://www.lequipe.fr/Football/FootballFicheClub22.html
  const URL = "https://www.lequipe.fr/Football/FootballFicheClub" + team.lequipeId + ".html";
  request(URL, function(error, response, body) {
    if (error) {
      callback("Unable to get : " + URL + ". Faking 5 last results.")
      return ['d', 'd', 'd', 'd', 'd'];
    }
    var doc = cheerio.load(body);
    var five = [];
    for (var i = 0; i < 5; i++) {
      // console.log(doc('#LASTMATCHS .fc_match .fc_m_score').eq(i).html());
      var isWin = doc('#LASTMATCHS .fc_match .fc_m_score').eq(i).hasClass('victoire');
      var isDefeat = doc('#LASTMATCHS .fc_match .fc_m_score').eq(i).hasClass('defaite');
      var res = 'w';
      if (isDefeat) {
        res = 'l';
      } else if (!isDefeat && !isWin) {
        res = 'd';
      }
      five.push(res);
    }
    callback(five);
  });
  // #LASTMATCHS
  // .fc_match
  // .fc_m_score .defaite ou .victoire
}

module.exports.getFIFARatingAt = function(team, season, callback) {
  files.read('data/ratings/' + season + ".json", function(res) {
    var json = JSON.parse(res);
    for (var i = 0; i < json.length; i++) {
      if (json[i].name === team.toString()) {
        callback(json[i]);
        return;
      }
    }
    console.error('No FIFA rating for ' + team.toString() + ' season ' + season);
    callback({
      name: 'Unfound',
      att: 70,
      def: 70,
      gen: 70
    });
  });
}

module.exports.getFIFARating = function(team, callback) {
  module.exports.getFIFARatingAt(team, '18-19', callback);
}

module.exports.getStandingAt = function(team, season, day, callback) {
  files.read('data/standings/' + season + '.json', function(res) {
    var d = JSON.parse(res)[day - 1];
    for (var i = 0; i < 20; i++) {
      if (d[i].name === team.standingName) {
        callback(d[i]);
        return;
      }
    }
    console.error('Unable to find standing of ' + team + " season " + season + " day " + day + ". Using fake standing.");
    callback({
      name: team.toString(),
      position: 10,
      diff: 0
    });
  });
}

module.exports.getStanding = function(team, callback) {
  const URL = "https://www.lfp.fr/ligue1/classement";
  request(URL, function(error, response, body) {
    var doc = cheerio.load(body);
    var res = [];
    for (var t = 0; t < 20; t++) {
      var object = {};
      object.name = doc('tr').eq(t + 1).find('.club').text();
      object.name = object.name.replace(/\t/g, '');
      object.name = object.name.replace(/\n/g, '');
      object.name = object.name.replace(/ /g, '');
      if (object.name === team.standingName) {
        object.position = t + 1;
        object.diff = parseInt(doc('tr').eq(t + 1).find('.diff').text());
        object.name = team.toString();
        callback(object);
      }
    }
  });

}
