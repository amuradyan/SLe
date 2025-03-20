import { assertEquals } from "@std/assert";
import { add } from "./main.js";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});

const detoke = (input) => {
  const graphemes = Array.from(input.trim())

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

  const typeify = ([operator, ...rest]) => {
      const args = rest.map((x) => Number.parseInt(x));
      return [Symbol.for(operator), ...args];
  };

  const tokens = loop(graphemes)

  return typeify(tokens)
};

Deno.test("tokenize", async (t) => {
  assertEquals(detoke( "(color 255 255 255)"), [Symbol.for("color"), 255, 255, 255])
  assertEquals(detoke(`
    (color 255 255 255)
    `), [Symbol.for("color"), 255, 255, 255])
});

Deno.test("Calculate luminance", async (t) => {
  const program = "(luminance 49 135 50)";
  const luminance = 0.128

  // const persept = ???

  // assert(percept(program), luminance)
});
