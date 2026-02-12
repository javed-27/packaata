//  const upCards = (cards, positions = [1]) => {
//   const hand = [];
//   let a = Array.from({length : cards.length}, () => ' '.repeat(10));
//   for (let i = 0; i < cards.length; i++) {
//     if (positions.includes(i)) {
//       a[i] = (formatCard(cards[i]));
//     }
//   }
//   hand.push(a);
//    a = Array.from({length : cards.length}, () => ' '.repeat(10));
//   for (let i = 0; i < cards.length; i++) {
//     if (!positions.includes(i)) {
//       a[i] = (formatCard(cards[i]));
//     }
//   }
//   hand.push(a);
//   console.clear();
//   console.log(hand);
// }