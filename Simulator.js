const data = require('./DataFetcher');

module.exports.simulateSeason = function (season) {

    var score = 0, total = 0;
    var games = data.getSeason(season);
    for (var i = 0; i < games.length; i++) {
        var e1 = games[i].HomeTeam;
        var e2 = games[i].AwayTeam;
        var date = games[i].Date;

        var res = games[i].FTR;
        var pred = "";
        network.guess(teams.getTeam(e1), teams.getTeam(e2), function(p1, p2) {
          if (p1 > p2) {
              pred = "H";
          } else {
              pred = "A";
          }
          if (Math.abs(p1 - p2) < 10) {
              pred += "D";
          }
        });
    }
}
