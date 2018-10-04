const Team = require("./Team2");

// Home and Away both Team object
function Game2(home, away, date, score = "U") {

  this.home = home;
  this.away = away;

  // {home: [int, int, ...], away: [int, int, ...]}
  this.getInputs = function() {};

  // {home: [int], away: [int]}
  this.getOutputs = function(res) {
    if (res == "H") {
      return {
        home: 1,
        away: 0
      };
    }
    if (res == "D") {
      return {
        home: 0.5,
        away: 0.5
      };
    }
    if (res == "A") {
      return {
        home: 0,
        away: 1
      };
    }
    console.error("Game > Getting outputs on future game");
    return {
      home: 0.5,
      away: 0.5
    };
  };

  // {home: [double], away: [double]}
  this.getProbs = function() {};

}
