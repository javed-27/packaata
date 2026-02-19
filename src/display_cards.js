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
  const deckFormat = `${" ".repeat(20)}\nDECK\n${" ".repeat(20)}`;
  const deck = boxen(deckFormat, {
    backgroundColor: "red",
    borderStyle: "double",
    borderColor: "blueBright",
    textAlignment: "center",
  });
  const spaces = 7 - value.length;
  const cardFormat = `\n\n
${symbol[suit]}${" ".repeat(spaces)}${black(value)}`;

  const card = boxen(cardFormat, {
    backgroundColor: "white",
    borderStyle: "none",
    margin: { left: 6 },
  });

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
  });
  return cards;
};

const getDifference = (x, y) => x.value.charCodeAt() - y.value.charCodeAt();

export const sortCards = (cards) => cards.sort((a, b) => getDifference(a, b));

export const getHand = (cards) => {
  const boxLines = cards.map((x) => x.split("\n"));
  const hand = boxLines[0].map((_, i) =>
    boxLines.map((box) => box[i]).join(" ")
  ).join("\n");
  return hand;
};

export const getCards = (cards) => {
  const formatedCards = sortCards(cards).map(formatCard);
  return formatedCards;
};

const createButton = (msg) => {
  const button = boxen(msg, {
    backgroundColor: "red",
    padding: 0.8,
    borderStyle: "none",
    textAlignment: "center",
  });
  return button;
};

export const userUI = (userData) => {
  const deck = createDeckUi(userData.joker);
  const openCard = formatCard(userData.openCard);
  const hand = getHand(userData.hand);
  const formatedDeck = `\n\n\t\t\t\t\t\t${
    deck.split("\n").join("\n\t\t\t\t\t\t")
  }`;
  const release = createButton("release\ncards");

  const formatedOpenCard = `\n  open card\n  ${
    openCard.split("\n").join("\n  ")
  } \n`;
  const releaseButton = `${" ".repeat(110)}${
    release.split("\n").join("\n" + " ".repeat(110))
  }\n`;

  const formatedHand = `\n\n\n\n${hand}`;
  const screen = formatedDeck + formatedOpenCard + releaseButton + formatedHand;
  console.clear();
  console.log(screen);
};
