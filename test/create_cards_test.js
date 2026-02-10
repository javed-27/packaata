import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing";
import {
  addJoker,
  createCards,
  createDeck,
  createSet,
  getSets,
} from "../src/create_cards.js";

describe("creating deck cards", () => {
  it("1. creating a single deck", () => {
    const deck = createCards();
    assertEquals(deck.length, 54);
  });

  it("2. creating 2 deck of cards", () => {
    const deck = createCards(2);
    assertEquals(deck.length, 108);
  });

  it("3. creating 5 deck of cards", () => {
    const deck = createCards(5);
    assertEquals(deck.length, 54 * 5);
  });
});

describe("creating single set", () => {
  const values = ["1", "2", "3"];
  it("1 .creating a heart deck", () => {
    const set = createSet("heart", "red", values);
    assertEquals(set.length, 3);
  });

  it("2. creating a heart deck", () => {
    const set = createSet("heart", "red", values);
    const expectedResult = [
      {
        color: "red",
        suit: "heart",
        value: "1",
      },
      {
        color: "red",
        suit: "heart",
        value: "2",
      },
      {
        color: "red",
        suit: "heart",
        value: "3",
      },
    ];
    assertEquals(set, expectedResult);
  });

  it("3. creating the club set", () => {
    const values = ["J", "Q", "K"];
    const set = createSet("club", "black", values);
    const expectedResult = [
      {
        color: "black",
        suit: "club",
        value: "J",
      },
      {
        color: "black",
        suit: "club",
        value: "Q",
      },
      {
        color: "black",
        suit: "club",
        value: "K",
      },
    ];
    assertEquals(set, expectedResult);
  });
});

describe("adding joker to the set", () => {
  it("1. empty deck", () => {
    const deck = [];
    addJoker(deck);
    assertEquals(deck, [{ value: "0", color: null, suit: null }]);
  });

  it("2. adding the addjoker to the deck with cards", () => {
    const values = ["J", "Q", "K"];
    const set = createSet("club", "black", values);
    addJoker(set);
    const expectedResult = [
      {
        color: "black",
        suit: "club",
        value: "J",
      },
      {
        color: "black",
        suit: "club",
        value: "Q",
      },
      {
        color: "black",
        suit: "club",
        value: "K",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
    ];

    assertEquals(set, expectedResult);
  });
});

describe("creating the deck", () => {
  it("1. no values , colors, values", () => {
    const deck = createDeck([], [], []);
    const expectedResult = [
      {
        color: null,
        suit: null,
        value: "0",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
    ];
    assertEquals(deck, expectedResult);
  });

  it("2. creating the ace card for the all the colors", () => {
    const suits = ["club", "heart", "spade", "diamond"];
    const values = ["A"];
    const colors = ["red", "red", "red", "red"];

    const deck = createDeck(suits, colors, values);
    const expectedResult = [
      {
        color: "red",
        suit: "club",
        value: "A",
      },
      {
        color: "red",
        suit: "heart",
        value: "A",
      },
      {
        color: "red",
        suit: "spade",
        value: "A",
      },
      {
        color: "red",
        suit: "diamond",
        value: "A",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
    ];
    assertEquals(deck, expectedResult);
  });
});

describe("dividing into the sets to playes", () => {
  it("1. players is one", () => {
    const suits = ["club", "heart", "spade", "diamond"];
    const values = ["A"];
    const colors = ["red", "red", "red", "red"];

    const cards = createDeck(suits, colors, values);
    cards.push({
      color: "red",
      suit: "club",
      value: "A",
    });
    const expectedResult = [[
      {
        color: "red",
        suit: "club",
        value: "A",
      },
      {
        color: "red",
        suit: "heart",
        value: "A",
      },
      {
        color: "red",
        suit: "spade",
        value: "A",
      },
      {
        color: "red",
        suit: "diamond",
        value: "A",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
      {
        color: "red",
        suit: "club",
        value: "A",
      },
    ]];
    const result = getSets(1, cards);
    assertEquals(result, expectedResult);
  });
  it("2.. players are 5", () => {
    const suits = ["club", "heart", "spade", "diamond"];
    const values = ["A"];
    const colors = ["red", "red", "red", "red"];

    const cards = createDeck(suits, colors, values);
    cards.push({
      color: "red",
      suit: "club",
      value: "A",
    });
    const expectedResult = [[
      {
        color: "red",
        suit: "club",
        value: "A",
      },
      {
        color: "red",
        suit: "heart",
        value: "A",
      },
      {
        color: "red",
        suit: "spade",
        value: "A",
      },
      {
        color: "red",
        suit: "diamond",
        value: "A",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
      {
        color: null,
        suit: null,
        value: "0",
      },
      {
        color: "red",
        suit: "club",
        value: "A",
      },
    ], [], [], [], []];
    const result = getSets(5, cards);
    assertEquals(result, expectedResult);
  });
});
