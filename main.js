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

const getSets = (count) => {
  const sets = [];
  for (let counter = 0; counter < count; counter++)
    sets.push({});
  return sets;
}

const writeSetsToPlayer = async (sets, players) => {
  for (let index = 0; index < sets.length; index++) {
    await writeToPlayer(players[index], sets[index]);
  }
  return { isSuccess: true, msg: 'successfully written' };
}

const startGame = async (players) => {
  const sets = getSets(players.length);
  await writeSetsToPlayer(sets, players);
  while (true) {
    
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