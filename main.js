const writeToPlayer = async (player, data) => {
  const encoder = new TextEncoder();
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

const main = async () => {
  const listener = Deno.listen({ port: 8000 });
  const numberOfPlayers = +prompt('enter the number of players :');
  const players = await getPlayers(listener, numberOfPlayers);
}

main();