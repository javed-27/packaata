import { displayCards } from "./display_cards.js";

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
  connection.write(new TextEncoder().encode("ok"));
  while (true) {
    const previousCard = await readFromServer(connection);
    displayCards([parse(previousCard)]);
    console.log();
    displayCards(cards);
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
