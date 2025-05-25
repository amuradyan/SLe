import { tokenize } from "./sintez.js";
import { assertEquals } from "jsr:@std/assert";

const atom = (name) => Symbol.for(name);

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
      assertEquals(result, [atom("fifa")]);
    },
  });

  await t.step({
    name: "regard spaces as delimiters",
    fn: () => {
      const result = tokenize("fifa 2002");
      assertEquals(result, [atom("fifa"), 2002]);
    },
  });

  await t.step({
    name: "regard whitespaces as delimiters",
    fn: () => {
      const result = tokenize(`
        (sequence
          (tone 261.63 1000)
          (tone 293.66 2000))
      `);
      assertEquals(result, [
        [atom("sequence"), [atom("tone"), 261.63, 1000], [
          atom("tone"),
          293.66,
          2000,
        ]],
      ]);
    },
  });

  await t.step({
    name: "tokenize Shvi code",
    fn: () => {
      const result = tokenize("tone 261.63 1000");

      assertEquals(result, [
        atom("tone"),
        261.63,
        1000,
      ]);
    },
  });

  await t.step({
    name: "tokenize a list",
    fn: () => {
      const result = tokenize("(a 1)");
      assertEquals(result, [[atom("a"), 1]]);
    },
  });

  await t.step({
    name: "tokenize a nested list",
    fn: () => {
      const result = tokenize("((a (f t)) (b))");
      assertEquals(result, [[
        [atom("a"), [atom("f"), atom("t")]],
        [atom("b")],
      ]]);
    },
  });
});
