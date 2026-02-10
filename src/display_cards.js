import boxen from "npm:boxen";
import { black } from "@tsd/color";

const symbol = {
  spade: "♠️",
  club: "♣️",
  heart: "❤️",
  diamond: "♦️",
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

export const displayCards = (cards) => {
  const formatedCards = cards.map(formatCard);
  const boxLines = formatedCards.map((x) => x.split("\n"));
  const hand = boxLines[0].map((_, i) =>
    boxLines.map((box) => box[i]).join(" ")
  ).join("\n");
 console.log(hand);

  return hand;
};
