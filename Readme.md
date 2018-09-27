# Pronostaic

## What is it ?
This project goal is to create an AI able to predict the french football league results.
The final goal is to give as an input a game ('Marseille - Lyon'), then the neural network gives as the output H/D/A (Home / Draw / Away).

## How it works ?
Every L1 team will have it's own network. As the input we give a bunch of params, listed further, and the neural network gives a prediction of the win luck. Every networks will be train with the past 9 seasons.

## Data
Here is the list of inputs given to a team network :
  * Current team FIFA rating (over 99)
  * Opponent FIFA rating (over 99)
  * Last 5 games win % (0 to 5)
  * Last 5 games win % against opponent (0 to 5)
  * Current standing (over 20)
  * Current opponent standing (over 20)
  * Opponent scored / conceded %
  * Away / Home (0 => Away or 1 => Home)

## TODO
- [x] Get last results
- [x] Create a formal team list
- [x] Get the last five results of team
- [x] Get the last five results of team at a given date
- [x] Get the last five results of team against opponent
- [x] Get the last five results of team against opponent at a given date
- [ ] Get a team current standing
- [ ] Get a team current standing at a given date
- [ ] Get a team current FIFA rating
- [ ] Get a team current FIFA rating  at a given date
- [ ] Get a team current scored / conceded %
- [ ] Get a team current scored / conceded %  at a given date
