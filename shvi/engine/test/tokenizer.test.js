import { tokenize } from "../src/shvi.js";
import { assertEquals } from "@std/assert";

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
      const result = tokenize("1");
      assertEquals(result, [1]);
    },
  });

  await t.step({
    name: "tokenize a symbol",
    fn: () => {
      const result = tokenize("a");
      assertEquals(result, [Symbol.for("a")]);
    },
  });

  await t.step({
    name: "regard tabs and spaces and newlines as whitespace",
    fn: () => {
      const result = tokenize("a \t 1\n");
      assertEquals(result, [Symbol.for("a"), 1]);
    },
  });

  await t.step({
    name: "tokenize a list",
    fn: () => {
      const result = tokenize("(a 1)");
      assertEquals(result, [[Symbol.for("a"), 1]]);
    },
  });

  await t.step({
    name: "tokenize a nested list",
    fn: () => {
      const result = tokenize("((a (f t)) (b))");
      assertEquals(result, [[
        [Symbol.for("a"), [Symbol.for("f"), Symbol.for("t")]],
        [Symbol.for("b")],
      ]]);
    },
  });

  await t.step({
    name: "ignore line comments",
    fn: () => {
      const result = tokenize("1 ; this is a comment\n");
      assertEquals(result, [1]);
    },
  });
});
