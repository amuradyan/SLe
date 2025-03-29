import { assertEquals } from "@std/assert";
import { definitions, dnevalni, lookupFromEnv } from "./slim.js";
import { assertAlmostEquals } from "@std/assert";

Deno.test.only("slim snippets", async (t) => {
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

  await t.step("average brightness 2", () => {
    const code = `
      (/ (+ 10 40 10) 3)
    `;

    const result = dnevalni(code, definitions);

    assertAlmostEquals(result, 20);
  });

  await t.step({
    name: "ITU-R BT.601 Luma Formula",
    fn() {
      dnevalni(`
        (luma-formula 10 20 30)
      `);
    },
    ignore: true,
  });

  await t.step({
    name: "HSP Model (Human Sensitivity to Perceived Brightness)",
    fn() {
      dnevalni(`
        (hsp-model 10 20 30)
      `);
    },
    ignore: true,
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

// 🔹 3. ITU-R BT.601 Luma Formula (used in video):
// Y=0.299R+0.587G+0.114B
// Y=0.299R+0.587G+0.114B
//
// (+ (* 0.299 R) (+ (* 0.587 G))(+ (* 0.114 B)))

// Often used as a proxy for perceived brightness from RGB.
// 🔹 4. HSP Model (Human Sensitivity to Perceived Brightness):
// Perceived Brightness=0.299R2+0.587G2+0.114B2
// Perceived Brightness=0.299R2+0.587G2+0.114B2
// ​
// (square-root
//   (+
//     (* 0.299 (power RED 2))
//     (* 0.587 (power Green 2))
//     (* 0.114 (power BLUE 2))))
// This accounts for human sensitivity better than simple averages.
