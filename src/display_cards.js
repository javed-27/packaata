import boxen from "npm:boxen";
import { black } from "@tsd/color";

const symbol = {
  spade: "♠️",
  club: "♣️",
  heart: "❤️",
  diamond: "🔶",
};

const formatCard = ({ color, suit, value }) => {
  const format = `${value}       ${(symbol[suit])}
  \n\n\n\n
${symbol[suit]}       ${value}`;

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
  )
    .join("\n");
  console.log(hand);
};

const data = [
  {
    color: "black",
    suit: "spade",
    value: 1,
  },
  {
    color: "white",
    suit: "heart",
    value: 7,
  },
  {
    color: "black",
    suit: "diamond",
    value: 3,
  },
  {
    color: "white",
    suit: "club",
    value: 7,
  },
];

displayCards(data);
