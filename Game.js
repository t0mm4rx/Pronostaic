var data = require("./DataFetcher");

function Game(team, opponent, home, date, result) {

  this.getInputs = function() {
    var inputs = [];

    var season = data.dateToSeason(date);
    var teamFIFA = data.getFIFARatingAt(team, season);
    var opponentFIFA = data.getFIFARatingAt(opponent, season);
    // Home FIFA rating
    inputs.push(teamFIFA.general / 99);
    // Home FIFA attack rating
    inputs.push(teamFIFA.att / 99);
    // Home FIFA defense rating
    inputs.push(teamFIFA.def / 99);
    // Opponent FIFA rating
    inputs.push(opponentFIFA.general / 99);
    // Opponent FIFA attack rating
    inputs.push(opponentFIFA.att / 99);
    // Opponent FIFA defense rating
    inputs.push(opponentFIFA.def / 99);

    // Home / Away
    inputs.push((home === true ? 1 : 0));

    // Five last games
    var lastGames = data.getLastFiveResultsAt(date, team.toString());
    var s = 0;
    for (var i = 0; i < 5; i++) {
      if (lastGames[i] === 'w') {
        s++;
      } else if (lastGames[i] === 'd') {
        s += 0.4;
      }
    }
    inputs.push(s / 5);

    // Five last games against opponent
    var lastGamesAgainst = data.getLastFiveResultsAgainstAt(date, team.toString(), opponent);
    s = 0;
    for (var i = 0; i < 5; i++) {
      if (lastGamesAgainst[i] === 'w') {
        s++;
      } else if (lastGamesAgainst[i] === 'd') {
        s += 0.4;
      }
    }
    inputs.push(s / 5);

    // Opponent Five last games
    var opponentLastGames = data.getLastFiveResultsAt(date, opponent);
    s = 0;
    for (var i = 0; i < 5; i++) {
      if (opponentLastGames[i] === 'w') {
        s++;
      } else if (opponentLastGames[i] === 'd') {
        s += 0.4;
      }
    }
    inputs.push(s / 5);

    // Team standing
    // Team diff
    // Opponent standing
    // Opponent diff

    return inputs;
  };

  this.getOutputs = function() {
    if (result === 'w') {
      return [1];
    }
    if (result === 'd') {
      return [0.5];
    }
    return [0];
  }

}

Game.now = function(team, opponent, home, callback) {
  var inputs = [];

  var teamFIFA = data.getFIFARating(team);
  var opponentFIFA = data.getFIFARating(opponent);
  // Home FIFA rating
  inputs.push(teamFIFA.general / 99);
  // Home FIFA attack rating
  inputs.push(teamFIFA.att / 99);
  // Home FIFA defense rating
  inputs.push(teamFIFA.def / 99);
  // Opponent FIFA rating
  inputs.push(opponentFIFA.general / 99);
  // Opponent FIFA attack rating
  inputs.push(opponentFIFA.att / 99);
  // Opponent FIFA defense rating
  inputs.push(opponentFIFA.def / 99);

  // Home / Away
  inputs.push((home === true ? 1 : 0));

  // Five last games
  data.getLastFiveResults(team.toString(), function(lastGames) {
    var s = 0;
    for (var i = 0; i < 5; i++) {
      if (lastGames[i] === 'w') {
        s++;
      } else if (lastGames[i] === 'd') {
        s += 0.4;
      }
    }
    inputs.push(s / 5);

    // Five last games against opponent
    var lastGamesAgainst = data.getLastFiveResultsAgainst(team.toString(), opponent);
    s = 0;
    for (var i = 0; i < 5; i++) {
      if (lastGamesAgainst[i] === 'w') {
        s++;
      } else if (lastGamesAgainst[i] === 'd') {
        s += 0.4;
      }
    }
    inputs.push(s / 5);

    // Opponent Five last games
    data.getLastFiveResults(opponent, function(opponentLastGames) {
      s = 0;
      for (var i = 0; i < 5; i++) {
        if (opponentLastGames[i] === 'w') {
          s++;
        } else if (opponentLastGames[i] === 'd') {
          s += 0.4;
        }
      }
      inputs.push(s / 5);
      callback(inputs);
    });

  });


  // Team standing
  // Team diff
  // Opponent standing
  // Opponent diff

}

module.exports = Game;
