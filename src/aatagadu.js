import { getCards, userUI } from "./display_cards.js";
import { selectCards } from "./read_positions.js";
import { select } from "npm:@inquirer/prompts";

const parse = (rawData) => {
  const data = (new TextDecoder()).decode(rawData);
  const result = JSON.parse(data);
  return result;
};

const writeToScreen = (rawData) => {
  const result = parse(rawData);
  console.log(result);
};

const readFromServer = async (connection) => {
  const buffer = new Uint8Array(1024);
  const byteCount = await connection.read(buffer);
  return buffer.slice(0, byteCount);
};

const dropCards = (cards, cardNumbers) => {
  cardNumbers.sort((a, b) => a - b);
  return cards.splice(cardNumbers[0], cardNumbers.length);
};

const takeACard = async (connection) => {
  const option = await select({
    message: "Select an option",
    choices: [
      { name: "take the previous card", value: "previous" },
      { name: "take the card from deck", value: "deck" },
    ],
  });
  await connection.write(
    new TextEncoder().encode(JSON.stringify({ cardType: option })),
  );
  const newCard = parse(await readFromServer(connection));
  return newCard;
};

const play = async (connection) => {
  const msg = await readFromServer(connection);
  writeToScreen(msg);
  const data = await readFromServer(connection);
  const { cards, joker } = parse(data);
  connection.write(new TextEncoder().encode("ok"));

  while (true) {
    const previousCard = parse(await readFromServer(connection));
    const hand = getCards(cards);
    userUI({ hand, openCard: previousCard, joker });
    console.log("select the cards and click release");
    const cardNumbers = await selectCards(cards, previousCard, joker);

    const droppedCards = dropCards(cards, cardNumbers);
    userUI({ hand:getCards(cards), openCard: previousCard, joker });
    await connection.write(
      new TextEncoder().encode(JSON.stringify(droppedCards)),
    );
    if (
      droppedCards[0].value !== previousCard.value && droppedCards.length < 3
    ) {
      const card = await takeACard(connection);
      cards.push(card); // either from deck or the previous card
      const hand = getCards(cards);
      userUI({ hand, openCard: previousCard, joker });
    }
  }
};

const main = async () => {
  const connection = await Deno.connect({
    port: 8000,
    // hostname: "10.132.125.26",
  });
  await play(connection);
};

main();
