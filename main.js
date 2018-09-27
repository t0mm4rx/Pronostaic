const data = require('./DataFetcher');
const teams = require('./Teams');
const standings = require('./StandingsGenerator');

console.log('Loading...');
data.load();

console.log('--- Pronostaic ---');

// console.log(data.getLastFiveResultsAt('2013-02-05', teams.Lyon));

// console.log(data.getLastFiveResultsAgainstAt('2018-02-05', teams.Lyon, teams.Marseille));

/* data.getLastFiveResults(teams.Lyon, function (res) {
  console.log(res);
});*/

standings.generate();
