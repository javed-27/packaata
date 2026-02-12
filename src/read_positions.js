const readMouseClick = async(reader) => {
  const {value } = await reader.read();
  const col = value[4] - 32;
  const row = value[5] - 32;
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
  writer.releaseLock();
  reader.releaseLock();
  return [col ,row];
}

export const removeTheIndex = (numbers, num) => {
  const index = numbers.findIndex(x => x=== num);
  numbers.splice(index, 1);
}

const handleTheIndex = (indexes, index, cards) => {
  if (indexes.includes(index)) {
   return removeTheIndex(indexes, index);
  }
  const lenght = indexes.filter((i) => cards[i].value === cards[index].value ).length;
  if (indexes.length === lenght)
    indexes.push(index);
}

const selectCards = async(cards) => {
  const indexes = []
  while (true) {
    const [col, row] = await readPositions();
    if ([25,26].includes(row) && [100,101].includes(col)) return indexes;
    const index = Math.floor(col / 10); 
    handleTheIndex(indexes, index, cards);
  }
}

selectCards()