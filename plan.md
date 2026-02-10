# Cards

## data structure

    -- the card is stired as a object with its value (i.e) color,symbol and value.
    -- and the all the 52 cards are stored in an array.

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

display ui : at bottom --> cards middle --> deck , joker. left --> previous
right --> thrown card .

game play -> cards(decks) -> shuffle splice(0,7) per person -> remaing deck ->
start game -> open card, joker. -> first player -> cards will be dipslay from
left to right -> user will select which cards to drop the relaese button ->
previous cards will be store in an array and the last card will be display on
the deck -> show button if palyer want to click the show button the player score
should be less than 10 -> after that every player score should be caluculated
and display the winner

function(value,group,color) => create card
