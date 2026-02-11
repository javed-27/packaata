import boxen from "npm:boxen";
import { black } from "@tsd/color";

const symbol = {
  spade: "♠️",
  club: "♣️",
  heart: "❤️",
  diamond: "♦️",
  null: "🃏",
};

const formatCard = ({ suit, value }) => {
  const format = `${black(value)}       ${(symbol[suit])}
\n\n\n\n
${symbol[suit]}       ${black(value)}`;

  const cards = boxen(format, {
    backgroundColor: "white",
    borderStyle: "none",
  });

  return cards;
};

const getDifference = (x, y) => x.value.charCodeAt() - y.value.charCodeAt();

const sortCards = (cards) => cards.sort((a, b) => getDifference(a, b));

export const displayCards = (cards) => {
  const formatedCards = sortCards(cards).map(formatCard);
  const boxLines = formatedCards.map((x) => x.split("\n"));
  const hand = boxLines[0].map((_, i) =>
    boxLines.map((box) => box[i]).join(" ")
  ).join("\n");
  console.log(sortCards(hand));
  return hand;
};
