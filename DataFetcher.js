const fs = require('fs')

module.exports.seasons = [];

module.exports.load = function () {
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
    module.exports.seasons[i].sort(function (a, b) {
      var date1 = new Date(a.Date).getTime();
      var date2 = new Date(b.Date).getTime();
      return date1 - date2;
    });
  }
}

module.exports.getLastFiveResultsAt = function ( date, team ) {
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

module.exports.getLastFiveResultsAgainstAt = function ( date, team, opponent ) {
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
