import { getCards, userUI } from "./display_cards.js";
import { selectCards } from "./read_positions.js";

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

const play = async (connection) => {
  const msg = await readFromServer(connection);
  writeToScreen(msg);
  const data = await readFromServer(connection);
  console.log(parse(data));
  const { cards, joker } = parse(data);
  connection.write(new TextEncoder().encode("ok"));

  while (true) {
    const previousCard = parse(await readFromServer(connection));
    const hand = getCards(cards);
    userUI({ hand, openCard: previousCard, joker });
    prompt("");
    const cardNumber = await selectCards(cards, previousCard, joker);
    const [droppedCard] = cards.splice(cardNumber[0], 1);
    await connection.write(
      new TextEncoder().encode(JSON.stringify(droppedCard)),
    );
  }
};

const main = async () => {
  const connection = await Deno.connect({
    port: 8000,
    hostname: "10.132.125.26",
  });
  await play(connection);
};

main();
