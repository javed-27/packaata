const writeToScreen = (rawData) => {
  const data = (new TextDecoder()).decode(rawData);
  console.log(data);
}

const readFromServer = async (connection) => {
  const buffer = new Uint8Array(1024);
  const byteCount = await connection.read(buffer);
  return buffer.slice(0, byteCount);
}

const play = async (connection) => {
  const data = await readFromServer(connection);
  writeToScreen(data);
}

const main = async () => {
  const connection = await Deno.connect({ port: 8000 });
  await play(connection);
}

main();