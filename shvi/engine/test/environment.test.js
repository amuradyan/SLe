import { environmentLookup } from "../src/shvi.js";
import { assertEquals } from "@std/assert";

Deno.test("Environment", async (t) => {
  const env = [
    [Symbol.for("a"), 1],
    [Symbol.for("b"), 2],
  ];

  await t.step({
    name: "lookup a value by its name",
    fn: () => {
      const result = environmentLookup(Symbol.for("a"), env);
      assertEquals(result, 1);
    },
  });

  await t.step({
    name: "Report accordingly, it the value is not found",
    fn: () => {
      const result = environmentLookup(Symbol.for("c"), env);
      assertEquals(result, "🪈 |Shvi| Error: Unknown name ....... \`c\`");
    },
  });
});
