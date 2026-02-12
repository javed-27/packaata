import { formatCard, userUI } from "./display_cards.js";

const combineSpaces = (data, positions, i) => {
  if (positions.includes(i)) return data + "\n" + " ".repeat(9);
  return " ".repeat(9) + "\n" + data;
};

export const upAndDownCards = (cards, positions, openCard, joker) => {
  const formatedCards = cards.map(formatCard);
  const spaceAddedCards = [];
  for (let i = 0; i < formatedCards.length; i++) {
    spaceAddedCards[i] = combineSpaces(formatedCards[i], positions, i);
  }

  const obj = { joker, openCard, hand: spaceAddedCards };
  userUI(obj);
};
