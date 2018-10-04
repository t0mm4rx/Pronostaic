/**************************
  This class contains all functions needed to grad data
**************************/

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const files = require('./Files');
const Game = require('./Game');

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

// Team as string
module.exports.getLastFiveResultsAt = function(date, team) {
  var time = new Date(date).getTime();
  // return team + ' on ' + date;
  var results = [];
  // Get the last season with data for this team
  for (var i = module.exports.seasons.length - 1; i > 0; i--) {
    var season = module.exports.seasons[i];
    if (JSON.stringify(season).indexOf(team) != -1) {
      for (var x = season.length - 1; x > 0; x--) {
        if (new Date(season[x].Date).getTime() < time) {
          if (season[x].HomeTeam === team) {
            if (season[x].FTR === 'H') {
              results.push('w');
            }
            if (season[x].FTR === 'D') {
              results.push('d');
            }
            if (season[x].FTR === 'A') {
              results.push('l');
            }
            if (results.length >= 5) {
              return results;
            }
          }
          if (season[x].AwayTeam === team) {
            if (season[x].FTR === 'A') {
              results.push('w');
            }
            if (season[x].FTR === 'D') {
              results.push('d');
            }
            if (season[x].FTR === 'H') {
              results.push('l');
            }
            if (results.length >= 5) {
              return results;
            }
          }
        }
      }
    }
  }
  console.error('DataFetcher > Unable to find last matchs ' + team + ' at ' + date + '. Using fake data.');
  return ['d', 'd', 'd', 'd', 'd'];
}

// Team as team object, opponent as string
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
          if (season[x].HomeTeam === team.toString() && season[x].AwayTeam === opponent) {
            if (season[x].FTR === 'H') {
              results.push('w');
            }
            if (season[x].FTR === 'D') {
              results.push('d');
            }
            if (season[x].FTR === 'A') {
              results.push('l');
            }
            if (results.length >= 5) {
              return results;
            }
          }
          if (season[x].AwayTeam === team.toString() && season[x].HomeTeam === opponent) {
            if (season[x].FTR === 'A') {
              results.push('w');
            }
            if (season[x].FTR === 'D') {
              results.push('d');
            }
            if (season[x].FTR === 'H') {
              results.push('l');
            }
            if (results.length >= 5) {
              return results;
            }
          }
        }
      }
    }
  }
  console.error('DataFetcher > Unable to find last matchs ' + team.toString() + ' - ' + opponent + '. Using fake data.');
  return ['d', 'd', 'd', 'd', 'd'];
}

module.exports.getLastFiveResultsAgainst = function(team, opponent) {
  var d = new Date();
  var s = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay();
  return module.exports.getLastFiveResultsAgainstAt(s, team, opponent);
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
}

module.exports.getFIFARatingAt = function(team, season) {
  var res = files.readSync('data/ratings/' + season + ".json");
  var json = JSON.parse(res);
  for (var i = 0; i < json.length; i++) {
    if (json[i].name === team.toString()) {
      return json[i];
    }
  }
  console.error('DataFetcher > No FIFA rating for ' + team + ' season ' + season);
  return {
    name: 'Unfound',
    att: 70,
    def: 70,
    general: 70
  };
}

module.exports.getFIFARating = function(team) {
  return module.exports.getFIFARatingAt(team, '18-19');
}

module.exports.getStandingAt = function(team, season, day) {
  var res = files.readSync('data/standings/' + season + '.json');
  var d = JSON.parse(res)[day - 1];
  for (var i = 0; i < 20; i++) {
    if (d[i].name === team.standingName) {
      return d[i];
    }
  }
  console.error('DataFetcher > Unable to find standing of ' + team + " season " + season + " day " + day + ". Using fake standing.");
  return {
    name: team.toString(),
    position: 10,
    diff: 0
  };

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

module.exports.getTeamGamesForSeason = function(team, season, callback) {
  var data = files.readSync('data/resultats/' + season + ".json");
  var games = JSON.parse(data);
  var res = [];
  for (var i = 0; i < games.length; i++) {
    if (games[i].HomeTeam === team.toString()) {
      var r = games[i].FTR;
      if (r === 'H') {
        r = 'w';
      }
      if (r === 'A') {
        r = 'l';
      }
      if (r === 'D') {
        r = 'd';
      }
      res.push(new Game(team, games[i].AwayTeam, true, games[i].Date, r));
    }
    if (games[i].AwayTeam === team.toString()) {
      var r = games[i].FTR;
      if (r === 'A') {
        r = 'w';
      }
      if (r === 'H') {
        r = 'l';
      }
      if (r === 'D') {
        r = 'd';
      }
      res.push(new Game(team, games[i].HomeTeam, false, games[i].Date, r));
    }
  }
  return res;
}

// Input as YYYY-MM-DD, output as 16-17
module.exports.dateToSeason = function(date) {
  var m = parseInt(date.split('-')[1]);
  var y = parseInt(date.split('-')[0]);
  if (m >= 6 && m <= 12) {
    return (y - 2000) + '-' + (y - 1999);
  } else {
    return (y - 2001) + '-' + (y - 2000);
  }
}

module.exports.dateToSeasonDay = function(date) {
  var season = module.exports.dateToSeason(date);

}

module.exports.getSeason = function (season) {
  var data = files.readSync('data/resultats/' + season + ".json");
  var games = JSON.parse(data);
  var res = [];
  for (var i = 0; i < games.length; i++) {
    res.push(games[i]);
  }
  return res;

}
