import { tokenize } from "./sintez.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("Tokenizer", async (t) => {
  await t.step({
    name: "no input is an empty list",
    fn: () => {
      const result = tokenize("");
      assertEquals(result, []);
    },
  });

  await t.step({
    name: "tokenize a number",
    fn: () => {
      const result = tokenize("12.3");
      assertEquals(result, [12.3]);
    },
  });

  await t.step({
    name: "tokenize a symbol",
    fn: () => {
      const result = tokenize("fifa");
      assertEquals(result, [Symbol.for("fifa")]);
    },
  });

  await t.step({
    name: "regard spaces as delimiters",
    fn: () => {
      const result = tokenize("fifa 2002");
      assertEquals(result, [Symbol.for("fifa"), 2002]);
    },
  });
});
