import { describe, it } from "@std/testing";
import { sortCards } from "../src/display_cards.js";
import { assertEquals } from "@std/assert/equals";

describe("sorting the cards", () => {
  it("1. value is only number", () => {
    const cards = [{ value: "1" }, { value: "4" }, { value: "1" }, {
      value: "2",
    }];
    const expectedResult = [{ value: "1" }, { value: "1" }, { value: "2" }, {
      value: "4",
    }];
    const result = sortCards(cards);
    assertEquals(result, expectedResult);
  });

  it("2. value is mixed", () => {
    const cards = [
      { value: "1" },
      { value: "4" },
      { value: "1" },
      { value: "2" },
      { value: "k" },
      { value: "j" },
      { value: "k" },
    ];
    const expectedResult = [
      { value: "1" },
      { value: "1" },
      { value: "2" },
      { value: "4" },
      { value: "j" },
      { value: "k" },
      { value: "k" },
    ];
    const result = sortCards(cards);
    assertEquals(result, expectedResult);
  });
});
