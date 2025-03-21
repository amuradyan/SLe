import { assertEquals } from "@std/assert";
import { definitions, dnevalni, lookupFromEnv } from "./slim.js";
import { assertAlmostEquals } from "@std/assert";

Deno.test("slim snippets", async (t) => {
  await t.step("luminance", () => {
    const code = `
        (luminance 10 10 10)
    `;

    const result = dnevalni(code, definitions);

    assertAlmostEquals(result, 10);
  });

  await t.step("average brightness", () => {
    const code = `
        (average-brightness 10 40 10)
    `;

    const result = dnevalni(code, definitions);

    assertAlmostEquals(result, 20);
  });
});

Deno.test("definitions", async (t) => {
  await t.step("lookup", () => {
    assertEquals(
      lookupFromEnv(definitions[0][0], definitions),
      definitions[0][1],
    );
  });
});
