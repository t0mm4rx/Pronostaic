const network = require('./TeamNetwork');

network.init();

console.log('------ Pronostaic v1.0 ------');

var command = process.argv[2];

if (command === "train") {
  /*if (teams.getTeam(process.argv[3]) === null) {
    console.error('Unknown team, exiting');
    return;
  }
  network.train(teams.getTeam(process.argv[3]));*/
  network.train(process.argv[3]);
}

if (command === "guess") {
  if (teams.getTeam(process.argv[3]) === null || teams.getTeam(process.argv[4]) === null) {
    console.error('Unknown team, exiting');
    return;
  }

  /*network.guess(teams.getTeam(process.argv[3]), teams.getTeam(process.argv[4]), function(p1, p2) {
    console.log(teams.getTeam(process.argv[3]).toString() + " : " + p1);
    console.log(teams.getTeam(process.argv[4]).toString() + " : " + p2);
  });*/
}

if (command === "simulate") {
  simulator.simulateSeason('17-18');
}

if (command === "test") {
    console.log(new Team2(process.argv[3]).getGames('17-18'));
}

// console.log(data.dateToSeason('2014-09-02'));

// I I I I I I I
