/*
const standings = require('./StandingsGenerator');*/
const teams = require('./Teams');
const network = require('./TeamNetwork');
const data = require('./DataFetcher');

network.init();

console.log('------ Pronostaic v1.0 ------');

var command = process.argv[2];

// console.log(data.getLastFiveResultsAgainst(teams.Paris, teams.Strasbourg.toString()));

if (command === "train") {
  if (teams.getTeam(process.argv[3]) === null) {
    console.error('Unknown team, exiting');
    return;
  }
  network.train(teams.getTeam(process.argv[3]));
}

if (command === "guess") {
  if (teams.getTeam(process.argv[3]) === null || teams.getTeam(process.argv[4]) === null) {
    console.error('Unknown team, exiting');
    return;
  }

  network.guess(teams.getTeam(process.argv[3]), teams.getTeam(process.argv[4]), function(p1, p2) {
    console.log(teams.getTeam(process.argv[3]).toString() + " : " + p1);
    console.log(teams.getTeam(process.argv[4]).toString() + " : " + p2);
  });
}

// console.log(data.dateToSeason('2014-09-02'));

// I I I I I I I
