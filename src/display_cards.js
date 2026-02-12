import boxen from "npm:boxen";
import { black } from "@std/color";

const symbol = {
  spade: "♠️",
  club: "♣️",
  heart: "❤️",
  diamond: "♦️",
  null: "🃏",
};

export const createDeckUi = ({ suit, value }) => {
  const deckFormat = `${" ".repeat(20)}\n\n${" ".repeat(20)}`;
  const deck = boxen(deckFormat, {
    backgroundColor: "red",
    borderStyle: "double",
    borderColor: "red",
  });

  const spaces = 7 - value.length;
  const cardFormat = `\n\n
${symbol[suit]}${" ".repeat(spaces)}${black(value)}`;

  const card = boxen(cardFormat, {
    backgroundColor: "white",
    borderStyle: "none",
    borderColor: "blueBright",
    margin: { left: 6 },
  });

  console.log(deck + "\n" + card);
  return deck + "\n" + card;
};

export const formatCard = ({ suit, value }) => {
  const spaces = 7 - value.length;

  const format = `${black(value)}${" ".repeat(spaces)}${(symbol[suit])}
\n\n\n\n
${symbol[suit]}${" ".repeat(spaces)}${black(value)}`;

  const cards = boxen(format, {
    backgroundColor: "white",
    borderStyle: "none",
    borderColor: "blueBright",
  });
  return cards;
};

export const getHand = (cards) => {
  const boxLines = cards.map((x) => x.split("\n"));
  const hand = boxLines[0].map((_, i) =>
    boxLines.map((box) => box[i]).join(" ")
  ).join("\n");
  return hand;
};

export const displayCards = (cards) => {
  const formatedCards = sortCards(cards).map(formatCard);
  const hand = getHand(formatedCards);
  console.log(hand);
  return hand;
};

const getDifference = (x, y) => x.value.charCodeAt() - y.value.charCodeAt();

export const sortCards = (cards) => cards.sort((a, b) => getDifference(a, b));
