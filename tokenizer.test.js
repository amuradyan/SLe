import { tokenize } from "./sintez.js";
import { assertEquals, fail } from "jsr:@std/assert";

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
    name: "tokenize Shvi code",
    fn: () => {
      const result = tokenize("tone 261.63 1000");

      fail("Write down the correct assertion and make it pass");
    },
  });
});
