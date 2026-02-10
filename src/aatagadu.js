import { displayCards, sortCards } from "./display_cards.js";

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
  const cards = parse(data);
  const sortedCards = sortCards(cards);
  displayCards(sortedCards);
  while (true) {
  }
};

const main = async () => {
<<<<<<< HEAD
  const connection = await Deno.connect({
    "hostname": "10.132.125.26",
    port: 8000,
  });
=======
  const connection = await Deno.connect({ port: 8000, hostname : '10.132.125.26' });
>>>>>>> da5647e5bdb2b6fef7a7676894216f7951d400e3
  await play(connection);
};

main();
