# Pronostaic

## What is it ?
This project goal is to create an AI able to predict the french football league (Ligue 1) results.
The final goal is to give as an input a game ('Marseille - Lyon'), then the neural network gives as output win accuracy over 1.

## How it works ?
Every L1 team will have it's own network. As the input we give a bunch of params, listed further, and the neural network gives a prediction of the win luck. Every networks will be train with the past 9 seasons.

## Data
Here is the list of inputs given to a team network :
  * Current team FIFA rating => integer 0-99
  * Current team FIFA defense rating => integer 0-99
  * Current team FIFA attack rating => integer 0-99
  * Opponent FIFA rating => integer 0-99
  * Opponent FIFA defense rating => integer 0-99
  * Opponent FIFA attack rating => integer 0-99
  * Last 5 games => ['l', 'd', 'w', 'w', 'd']
  * Last 5 games against opponent => ['l', 'd', 'w', 'w', 'd']
  * Current standing => integer 1-20
  * Current opponent standing => integer 1-20
  * Opponent scored / conceded => integer
  * Away / Home 0 => Away or 1 => Home

## Data Class
```js
  const data = require('./DataFetcher');
  const teams = require('./Teams');

  // Get the last five results in L1 for given team at given date, for training
  console.log(data.getLastFiveResultsAt('2013-02-05', teams.Lyon));

  // Get the last five results against a given team in L1 for given team at given date, for training
  console.log(data.getLastFiveResultsAgainstAt('2018-02-05', teams.Lyon, teams.Marseille));

  // Get the last five results in L1 for given team, for guessing
  data.getLastFiveResults(teams.Lyon, function (res) {
    console.log(res);
  });

  // Get the last five results against a given team in L1 for given team, for guessing
  data.getFIFARatingAt(teams.Lyon, '15-16', function (res) {
    console.log(res);
  });

  // Get standing and goal average for given team at given season and day (over 38)
  data.getStandingAt(teams.Toulouse, '16-17', 38, function (res) {
    console.log(res);
  });

  // Get standing and goal average  for given team
  data.getStanding(teams.Marseille, function (res) {
    console.log(res);
  });
```

## TODO
- [x] Get last results
- [x] Create a formal team list
- [x] Get the last five results of team
- [x] Get the last five results of team at a given date
- [x] Get the last five results of team against opponent
- [x] Get the last five results of team against opponent at a given date
- [x] Get a team current FIFA rating
- [x] Get a team current FIFA rating  at a given date
- [x] Get a team current standing at a given date
- [x] Get a team current scored / conceded %  at a given date
- [x] Get a team current standing
- [x] Get a team current scored / conceded %
