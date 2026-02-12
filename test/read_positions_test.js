import { describe, it } from "@std/testing";
import { removeTheIndex } from "../src/read_positions.js";
import { assertEquals } from "@std/assert/equals";

describe("removing the number for the array", () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  it("1. index is at first", () => {
    removeTheIndex(arr, 1);
    assertEquals(arr, [2, 3, 4, 5, 6, 7, 8]);
  });

  it("2. numbers in middle ", () => {
    removeTheIndex(arr, 5);
    assertEquals(arr, [2, 3, 4, 6, 7, 8]);
  });

  it("3. numbers in at last ", () => {
    removeTheIndex(arr, 8);
    assertEquals(arr, [2, 3, 4, 6, 7]);
  });
});
