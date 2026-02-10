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
  const cards = await readFromServer(connection);
  displayCards(parse(cards));
  while (true) {
  }
};

const main = async () => {
  const connection = await Deno.connect({ port: 8000 });
  await play(connection);
};

main();
