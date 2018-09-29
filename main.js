/*
const standings = require('./StandingsGenerator');*/
const teams = require('./Teams');
const network = require('./TeamNetwork');
const data = require('./DataFetcher');

network.init();

console.log('------ Pronostaic v1.0 ------');

// console.log(data.getLastFiveResultsAt('2013-02-05', teams.Lyon));

// console.log(data.getLastFiveResultsAgainstAt('2018-02-05', teams.Lyon, teams.Marseille));

/* data.getLastFiveResults(teams.Lyon, function (res) {
  console.log(res);
});*/

/*data.getFIFARatingAt(teams.Lyon, '15-16', function (res) {
  console.log(res);
});*/

// standings.generate();

/*data.getStandingAt(teams.Toulouse, '16-17', 38, function (res) {
  console.log(res);
});*/

/* data.getStanding(teams.Marseille, function (res) {
  console.log(res);
});*/

// console.log(data.getLastFiveResultsAt('2017-08-05', 'Amiens'));

/*network.train(teams.Reims);
network.train(teams.Bordeaux);*/

network.guess(teams.Reims, teams.Bordeaux, function (p1, p2) {
  console.log("P1 : " + p1);
  console.log("P2 : " + p2);
});

// console.log(data.dateToSeason('2014-09-02'));
