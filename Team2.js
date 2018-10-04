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

  this.getEquipeID = function() {
    if (utils.equipeId[this.name] != null) {
      return utils.equipeId[this.name];
    } else {
      return 0;
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
  this.getCurrentLastGames = function() {
    if (this.getEquipeID() != 0) {
      return data.getLastFiveResults(this.getEquipeID());
    } else {
      console.error("Team > Unknow L'Equipe id for " + this.name);
      return ['d', 'd', 'd', 'd', 'd'];
    }

  };
  this.getLastGamesAt = function(date) {
      return data.getLastFiveResultsAt(date, this.name);
  };
  this.getCurrentLastGamesAgainst = function (opponent) {
    return data.getLastFiveResultsAgainst(this.name, opponent.name);
  };
  this.getLastGamesAgainstAt = function (opponent, date) {
    return data.getLastFiveResultsAgainstAt(date, this.name, opponent.name);
  };

  // [{ opponent: Team, result: ('W', 'D', 'L'), home: (true, false)}, ...]
  this.getGames = function(season) {
    return data.getTeamGamesForSeason(this, season);
  };

  // void
  this.train = function() {};

}

module.exports = Team2;
