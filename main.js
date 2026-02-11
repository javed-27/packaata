import { createCards, getSets, shuffleCards } from "./src/create_cards.js";

const writeToPlayer = async (player, rawData) => {
  const encoder = new TextEncoder();
  const data = JSON.stringify(rawData);
  await player.write(encoder.encode(data));
  return { isSuccess: true, msg: 'written successfully' };
}

const getPlayers = async (listener, count) => {
  const players = [];
  for await (const conn of listener) {
    players.push(conn);
    console.log('player connected');
    await writeToPlayer(conn, 'welcome to packaata');
    if (players.length === count)
      return players;
  }
}

const writeSetsToPlayer = async (sets, players) => {
  const buffer = new Uint8Array(1024);
  for (let index = 0; index < sets.length; index++) {
    await writeToPlayer(players[index], sets[index]);
    await players[index].read(buffer);
  }
  return { isSuccess: true, msg: 'successfully written' };
}

const init = async (players) => {
  const cards = createCards();
  const shuffledCards = shuffleCards(cards);
  const joker = shuffledCards.shift();
  const openCard = shuffledCards.shift();
  const sets = getSets(players.length, shuffledCards);
  await writeSetsToPlayer(sets, players);
  return [sets, joker, openCard, shuffledCards];
}

const startGame = async (players) => {
  const buffer = new Uint8Array(1024);
  const [sets, joker, openCard, shuffledCards] = await init(players);
  let card = openCard;
  let index = 0;
  while (true) {
    await writeToPlayer(players[index], card);
    const bytes = await players[index].read(buffer);
    index = (index + 1) % players.length;
    card = JSON.parse(new TextDecoder().decode(buffer.slice(0, bytes)));
    // players[index].writeToPlayer()
  }
}

const main = async () => {
  const listener = Deno.listen({ port: 8000 });
  const numberOfPlayers = +prompt('enter the number of players :');
  const players = await getPlayers(listener, numberOfPlayers);
  setTimeout(() => {
    startGame(players);
  }, 2);
}

main();