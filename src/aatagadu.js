const writeToScreen = (rawData) => {
  const data = (new TextDecoder()).decode(rawData);
  const result = JSON.parse(data);
  console.log(result);
  return result;
}

const readFromServer = async (connection) => {
  const buffer = new Uint8Array(1024);
  const byteCount = await connection.read(buffer);
  return buffer.slice(0, byteCount);
}

const play = async (connection) => {
  while (true) {
    const data = await readFromServer(connection);
    writeToScreen(data);
  }
}

const main = async () => {
  const connection = await Deno.connect({ port: 8000 });
  await play(connection);
}

main();