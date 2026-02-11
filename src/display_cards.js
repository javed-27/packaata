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
  const spaces = 7 - value.length;

  const format = `${black(value)}${" ".repeat(spaces)}${(symbol[suit])}
\n\n\n\n
${symbol[suit]}${" ".repeat(spaces)}${black(value)}`;

  const cards = boxen(format, {
    backgroundColor: "white",
    borderStyle: "none",
  });
  return cards;
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
export const displayCards = (cards) => {
  const formatedCards = cards.map(formatCard);
  const boxLines = formatedCards.map((x) => x.split("\n"));
  const hand = boxLines[0].map((_, i) =>
    boxLines.map((box) => box[i]).join(" ")
  ).join("\n");
  console.log(hand);
  return hand;
};

>>>>>>> 0f51ad3 (adds dropping cards and transfering to other players)
>>>>>>> 867c77cdeb592bb08add39f5822e3a625dabfe87
const getDifference = (x, y) => x.value.charCodeAt() - y.value.charCodeAt();

export const sortCards = (cards) => cards.sort((a, b) => getDifference(a, b));