import { formatCard, getHand } from "./display_cards.js";

const combineSpaces = (data, positions, i) => {
  if (positions.includes(i)) return data + "\n" + " ".repeat(9);
  return " ".repeat(9) + "\n" + data;
};

export const upCards = (cards, positions = [1]) => {
  const formatedCards = cards.map(formatCard);
  const spaceAddedCards = [];
  for (let i = 0; i < formatedCards.length; i++) {
    spaceAddedCards[i] = combineSpaces(formatedCards[i], positions, i);
  }
  const hand = getHand(spaceAddedCards);
  console.clear();
  console.log(hand);
};
