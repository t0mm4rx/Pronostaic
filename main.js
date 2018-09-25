const data = require('./DataFetcher');
const teams = require('./Teams');

console.log('Loading...');
data.load();

console.log('--- Pronostaic ---');

console.log(data.getLastFiveResultsAt('13/11/13', teams.Lyon));
