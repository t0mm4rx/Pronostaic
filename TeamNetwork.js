const synaptic = require('synaptic');
// const data = require('./DataFetcher');
const files = require('./Files');

const Game2 = require('./Game2');
const Team2 = require('./Team2');

module.exports.init = function() {
  console.log('Loading...');
  // data.load();
}

module.exports.loadJSON = function(team, callback) {
  console.info("TeamNetwork > Loading " + team.toString());
  return synaptic.Network.fromJSON(JSON.parse(files.readSync('data/weights/' + team + '.json')));
}

module.exports.exportJSON = function(team, network) {
  console.info("TeamNetwork > Saving " + team);
  files.output('data/weights/' + team + '.json', JSON.stringify(network.toJSON()));
}

module.exports.isExisting = function(team) {
  return files.exists('data/weights/' + team + '.json');
}

module.exports.getNetwork = function(team) {
  if (module.exports.isExisting(team)) {
    return module.exports.loadJSON(team);
  } else {
    console.info("TeamNetwork > No network for " + team + ". Creating one.");
    var network = new synaptic.Architect.Perceptron(10, 8, 6, 1);
    module.exports.exportJSON(team, network);
    return network;
  }
}

module.exports.train = function(team) {

  // Filenames of seasons data
  var seasons = [
    '09-10',
    '10-11',
    '11-12',
    '12-13',
    '13-14',
    '14-15',
    '15-16',
    '16-17',
    '17-18'
  ];

  var t = new Team2(team);
  var net = module.exports.getNetwork(team);
  var c = 0;
  console.log(Game2);
  for (var s = 1; s < seasons.length; s++) {
    console.log("TeamNetwork > Training with season " + seasons[s]);
    var games = t.getGames(seasons[s]);
    var trainer = new synaptic.Trainer(net);
    var trainingSet = [];
    for (var i = 0; i < games.length; i++) {
      var game = new Game2(games[i].home, games[i].away, games[i].date, games[i].score, games[i].day);
      trainingSet.push({
        input: game.getInputs(),
        output: game.getOutputs()
      });
      c++;
    }
    console.log(trainingSet);
    /*trainer.train(trainingSet, {
      rate: .1,
      iterations: 60000,
      error: .005,
      shuffle: true
    });*/
  }
  module.exports.exportJSON(team, net);
  console.log("TeamNetwork > Trained with " + c + " games.");
}

module.exports.guess = function(team, opponent, callback) {
  module.exports.getNetwork(team, function(net) {
    Game.now(team, opponent.toString(), true, function(inputs) {
      console.log(inputs);
      var p1 = net.activate(inputs);
      module.exports.getNetwork(opponent, function(net2) {
        Game.now(opponent, team.toString(), false, function(inputs2) {
          console.log(inputs2);
          var p2 = net2.activate(inputs2);
          callback(p1, p2);
        });
      });
    });
  });
}
