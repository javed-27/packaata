const readMouseClick = async(reader) => {
  const {value } = await reader.read();
  const col = value[4] - 32;
  const row = value[5] - 32;
  console.log(col ,row);
  
  return [col, row];
}

export const readPositions = async() => {
  Deno.stdin.setRaw(true, {cbreak : true});
  const reader = Deno.stdin.readable.getReader();
  const writer = Deno.stdout.writable.getWriter();
  const encoder = new TextEncoder();
  await writer.write(encoder.encode('\x1b[?1000h'));
  const [col ,row ] = await readMouseClick(reader);
  await writer.write(encoder.encode('\x1b[?1000l'));
  return [col ,row];
}

const selectCards = async() => {
  const indexes = []
  while (true) {
    const [col, row] = await readPositions();
    if (row > 37 || row < 1) return indexes;
    const index = Math.floor(col / 10); 
    indexes.push(index);
    console.log(index);
  }
}

selectCards()