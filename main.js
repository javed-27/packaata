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

const writeSetsToPlayer = async (sets, joker, players) => {
  const buffer = new Uint8Array(1024);
  for (let index = 0; index < sets.length; index++) {
    await writeToPlayer(players[index], {cards:sets[index], joker});
    await players[index].read(buffer);
  }
  return { isSuccess: true, msg: 'successfully written' };
}

const init = async (players) => {
  const cards = createCards();
  const deck = shuffleCards(cards);
  const joker = deck.shift();
  const openCard = deck.shift();
  const sets = getSets(players.length, deck);
  await writeSetsToPlayer(sets, joker, players);
  return [openCard, deck];
}

const getCards = async (players) => {
  const buffer = new Uint8Array(1024);
  const sets = [];
  for (const player of players) {
    await writeToPlayer(player, 'show');
    const bytes = await player.read(buffer);
    const cards = JSON.parse(new TextDecoder().decode(buffer.slice(0, bytes)));
    sets.push(cards);
  }
  return sets;
}

const calculatePoints = (sets) => 'haji won the game';

const startGame = async (players) => {
  const decoder = new TextDecoder();
  const buffer = new Uint8Array(1024);
  const [openCard, deck] = await init(players);
  const remainingDeck = [];
  let card = openCard;
  let index = 0;
  while (true) {
    await writeToPlayer(players[index], card);// writing the open card
    const bytes = await players[index].read(buffer);
    
    const cards = JSON.parse(decoder.decode(buffer.slice(0, bytes)));
    if (cards !== 'show') {
      if (cards[0].value !== card.value && cards.length < 3) {
        const bytes = await players[index].read(buffer);
        const cardType = JSON.parse(decoder.decode(buffer.slice(0, bytes))).cardType;
        const data = cardType === 'previous' ? card : deck.shift();
        if (cardType === 'deck') remainingDeck.push(card);
        await writeToPlayer(players[index], data);
      }
      card = cards[0];
      remainingDeck.concat(cards.slice(1));
      if (deck.length === 1) {
        deck.concat(shuffleCards(remainingDeck));
      }
      index = (index + 1) % players.length;
    }
    if (cards === 'show') {
      break;
    }
  }
  const sets = await getCards(players);
  const result = calculatePoints(sets);
  for (const player of players) {
    await writeToPlayer(player, result);
  }
  return;
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