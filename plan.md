# Cards

## data structure

- the card is stored as a object with its value (i.e) color,symbol and value.
- and the all the 52 cards are stored in an array.

## structure

```js
[
  {
    color: "black",
    symbol: "spade",
    value: 1, 
  }
...
];
```

# Game

## game play

- shuflle the deck and give 7 cards per person.
- after distributing the cards remaning cards will place middle of the game.
- then the game will start,
- from the remaining deck 2 cards will be drawn one will be joker and anothe
  will be open card.
- the cards will display at bottom of the screen.
- player will select the cards to drop.
- and use the drop button to drop.
- the drop card will be shown at left to the next player.
- the last add card will be shown to the next player.
- all drop cards will be stored in an array .
- in case of the deck is empty the dropped cards will be shuffle and place as
  the deck.
- the show button will only active when the score of the player is less than 10.
- when the player click on the show th eplayer with the least score will win.

## least count

- **least count**
  - in least count every player get 7 cards each
  - with one deck a maximum of 5 players can play the game.
  - cards are distributed to every player after shuffling the deck

## functionallity

- **storage**
  - for storage we use array of objects to store the cards
  - a array contains a 54 (52 cards and two jockers) card objects like the deck
  - every card object contains 3 values (color,symbol,value)

- **shuffle**
  - for shuffle the cards we use the jsr shuffle the cards

- **UI**
  - the hand of cards will display at bottom of the screen
  - the remaining deck will palce at middle of the screen
  - previously dropped card will be shown left to the player
  - the thrown cards of the current player will be shoen right to the player
