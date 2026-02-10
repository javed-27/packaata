import { shuffle } from "@std/random";

export const createSet = (suit, color, values) => 
  values.map(value => ({value, suit, color}));

export const addJoker = (deck) => 
  deck.push({value : '0', color : null, suit : null});

export const createDeck = (suits, colors, values) => {
  const deck = [];
  for (let index = 0; index < colors.length; index++) {
    const set = createSet(suits[index], colors[index], values);
    deck.push(...set);
  }
  addJoker(deck);
  addJoker(deck);
  return deck;
}

export const createCards = (noOfDecks = 1) => {
  const suits = [ 'heart', 'diamond', 'spade','club'];
  const colors = ['red','red','black','black'];
  const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const deck = createDeck(suits, colors, values);
  return Array.from({length : noOfDecks}).flatMap(() => deck);
}

export const getSets = (players, cards) => 
  Array.from({length : players}).map(() => cards.splice(0,7));

export const shuffleCards = (cards) =>  shuffle(shuffle(cards));