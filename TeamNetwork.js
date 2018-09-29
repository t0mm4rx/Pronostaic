const synaptic = require('synaptic');
const data = require('./DataFetcher');
const files = require('./Files');
const Game = require('./Game');

module.exports.init = function() {
  console.log('Loading...');
  data.load();
}

module.exports.loadJSON = function(team, callback) {
  files.read('data/weights/' + team.id + '.json', function(res) {
    callback(synaptic.Network.fromJSON(JSON.parse(res)));
  });
}

module.exports.exportJSON = function(team, network) {
  console.info("Saving " + team.toString() + ' id : ' + team.id);
  files.output('data/weights/' + team.id + '.json', JSON.stringify(network.toJSON()));
}

module.exports.isExisting = function(team) {
  return files.exists('data/weights/' + team.id + '.json');
}

module.exports.getNetwork = function(team, callback) {
  if (module.exports.isExisting(team)) {
    module.exports.loadJSON(team, function(res) {
      callback(res);
    });
  } else {
    var network = new synaptic.Architect.Perceptron(10, 8, 6, 1);
    module.exports.exportJSON(team, network);
    callback(network);
  }
}

module.exports.train = function(team) {

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

  module.exports.getNetwork(team, function(net) {
    var c = 0;

    for (var s = 1; s < seasons.length; s++) {
      console.log("Training with season " + seasons[s]);
      var res = data.getTeamGamesForSeason(team, seasons[s]);
      var trainer = new synaptic.Trainer(net);
      var trainingSet = [];
      for (var i = 0; i < res.length; i++) {
        c++;
        trainingSet.push({
          input: res[i].getInputs(),
          output: res[i].getOutputs()
        });
      }
      trainer.train(trainingSet);
    }
    console.log("Trained with " + c + " games.");
  });
}

module.exports.guess = function(team, opponent, callback) {
  module.exports.getNetwork(team, function(net) {
    Game.now(team, opponent.toString(), 1, function(inputs) {
      var p1 = net.activate(inputs);
      module.exports.getNetwork(opponent, function(net2) {
        Game.now(opponent, team.toString(), 0, function(inputs2) {
          var p2 = net2.activate(inputs2);
          callback(p1, p2);
        });
      });
    });
  });
}
