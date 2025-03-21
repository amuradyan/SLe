import { definitions, dnevalni } from "./slim.js";
import { assertAlmostEquals } from "@std/assert/almost-equals";

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
        (average-brightness 10 10 10)
    `;

    const result = dnevalni(code, definitions);

    assertAlmostEquals(result, 10);
  });
});
