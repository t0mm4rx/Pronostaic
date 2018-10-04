const data = require("./DataFetcher");
const utils = require("./Utils");

// Name String
function Team2(name) {

  this.name = name;

  // String
  this.getStandingName = function() {
    if (utils.standingName[this.name] != null) {
      return utils.standingName[this.name];
    } else {
      return this.name;
    }
  };

  // Int
  this.getStandingAt = function(date) {

  };
  this.getCurrentStanding = function() {};

  // { general: 70, att: 70, def: 70s }
  this.getCurrentFIFARating = function() {
    return data.getFIFARating(this.name);
  };
  this.getFIFARatingAt = function(date) {
    return data.getFIFARatingAt(this.name, data.dateToSeason(date));
  };

  // ['w', 'w', 'd', 'l', 'd']
  this.getCurrentLastGames = function () {};
  this.getLastGamesAt = function () {};

  // [{ opponent: Team, result: ('W', 'D', 'L'), home: (true, false)}, ...]
  this.getGames = function(season) {};

  // void
  this.train = function() {};

}

module.exports = Team2;
