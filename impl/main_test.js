import { assertEquals } from "@std/assert";
import { add } from "./main.js";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});

Deno.test("tokenize", async (t) => {
  const input = "(color 255 255 255)";

  await t.step("detoke", () => {
    const detoke = (graphemes) => {
      const loop = (
        [graphemeAtHand, ...restOfGraphemes],
        tokens = [],
        tokenSoFar = "",
      ) => {
        if (!graphemeAtHand) {
          return tokenSoFar.length > 0 ? [...tokens, tokenSoFar] : tokens;
        }

        switch (graphemeAtHand) {
          case "(":
          case ")":
            return loop(restOfGraphemes, tokens, tokenSoFar);
          case " ":
            return loop(restOfGraphemes, [...tokens, tokenSoFar]);
          default:
            return loop(restOfGraphemes, tokens, tokenSoFar + graphemeAtHand);
        }
      };

      return loop(graphemes);
    };

    const output = detoke(Array.from(input));

    assertEquals(output, ["color", "255", "255", "255"]);
  });

  const tokens = ["color", "255", "255", "255"];

  await t.step("typeify", () => {
    const typeify = ([operator, ...rest]) => {
      const args = rest.map((x) => Number.parseInt(x));
      return [Symbol.for(operator), ...args];
    };

    assertEquals(typeify(tokens), [Symbol.for("color"), 255, 255, 255]);
  });

  // assertEquals(output, `(color 255 255 255)`)
  // assertEquals(output, `
  //   (color 255 255 255)
  // `)
});

Deno.test("Eval", async (t) => {
  const input = [Symbol.for("color"), 255, 255, 255];
  const output = [Symbol.for("rgb"), 255, 255, 255];
});

// Deno.test(function slim() {

// const smthelse = [Symbol.for('add'), [
//   [Symbol.for("color"), 122, 122, 122],
//   [Symbol.for("color"), 124, 124, 124]
// ]] = [
//   Symbol.for('color'), 246, 246, 246
// ]

// (add (color 255 0 0) (color 0 0 255))

//   const white = [Symbol.for("rgb"), 255, 255, 255]

//   const result = compute(`
//     (color 255 255 255)
//   `) // ('rgb 255 255 255)

//   assertEquals(result, white)
// })

Deno.test("Next", () => {
  // const step05 = ["(", "c", "o", "l", "o", "r", " ", "2", "5", "5", " ", "2", "5", "5", " ", "2", "5", "5", ")"]
  // const step08 = ["color", "255", "255", "255"]

  // const rgbSymbol = Symbol.for("rgb")
  // const rgbSymbolAgain = Symbol.for("rgb")

  // assertEquals(rgbSymbol, rgbSymbolAgain)

  // Xoy
  // compute `
  //   (rgb 255 0 0)
  // `

  // compute(`
  //   (mix (red 255) (green 255) (blue 255))
  // `) // ; (rgb 255 255 255)
});
