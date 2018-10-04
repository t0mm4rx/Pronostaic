const data = require("./DataFetcher");
const utils = require("./Utils");

// Name String
function Team2 (name) {

  this.name = name;

  // String
  this.getResultName = function () {};
  this.getStandingName = function () {};

  // Int
  this.getStandingAt = function (date) {};
  this.getCurrentStanding = function () {};

  // { general: 70, att: 70, def: 70s }
  this.getCurrentFIFARating = function () {};
  this.getFIFARatingAt = function () {};

  // [{ opponent: Team, result: ('W', 'D', 'L'), home: (true, false)}, ...]
  this.getGames = function (season) {};

  // void
  this.train = function () {};

}

module.exports = Team2;
