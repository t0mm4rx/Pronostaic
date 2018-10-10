const Team = require("./Team2");

// Home and Away both Team object
function Game2(home, away, date, score = "U", day) {

  this.home = home;
  this.away = away;

  // {home: [int, int, ...], away: [int, int, ...]}
  this.getInputs = function() {
    return {
      home: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
      away: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
    };
  };

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
