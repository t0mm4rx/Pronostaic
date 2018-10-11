const network = require('./TeamNetwork');

network.init();

console.log('------ Pronostaic v1.0 ------');

var command = process.argv[2];

if (command === "train") {
  network.train(process.argv[3]);
}

if (command === "guess") {
  console.log(network.guess(process.argv[3], process.argv[4]));
}

if (command === "simulate") {
  simulator.simulateSeason('17-18');
}

if (command === "test") {
    console.log(new Team2(process.argv[3]).getGames('17-18'));
}

// console.log(data.dateToSeason('2014-09-02'));

// I I I I I I I
