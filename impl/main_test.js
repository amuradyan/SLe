import { assertEquals } from "@std/assert";

import { detoke } from "./slim.js";

Deno.test("tokenize", () => {
  assertEquals(detoke("(luminance 255 255 255)"), [
    Symbol.for("luminance"),
    255,
    255,
    255,
  ]);
  assertEquals(
    detoke(`
    (color 255 255 255)
  `),
    [Symbol.for("color"), 255, 255, 255],
  );
});

Deno.test.ignore("tokenize nested parens", () => {
  // (/ (+ 10 40 10) 3) [[]]

  // (  -> [[] []]
  // /  -> [[/] []]
  // (  -> [[] [/] []]
  // +  -> [[+] [/] []]
  // 10 -> [[+ 10] [/] []]
  // 40 -> [[+ 10 40] [/] []]
  // 10 -> [[+ 10 40 10] [/]   []]
  // )  -> [[/ [+ 10 40 10]]   []]
  // 3  -> [[/ [+ 10 40 10] 3] []]
  // )  -> [[[/ [+ 10 40 10] 3]]]

  assertEquals(detoke("(/ (+ 10 40 10) 3)"), [
    [Symbol.for("/"), [Symbol.for("+"), 10, 40, 10], 3],
  ]);
});

// - evaluator applies operator to its operands
// - which one is the operator : 1st
// - what are the operands: rest
// ------------------------------------
// - /where to look for/ what do the operator and operands mean -> Environment
// What is an environment?

// Deno.test("Calculate luminance", () => {
//   const program = "(luminance 49 135 50)";
//   const luminance = 110.5794;

//   const env = [
//     Symbol.for("luminance"),
//     (red, green, blue) => 0.2126 * red + 0.7152 * green + 0.0722 * blue,
//   ];

//   const lookupFromEnv = () => {
//     return env[1];
//   };

//   //  ---> Tagavor <---

//   const dnevalni = (expression, _ = []) => {
//     const [noperator, ...noperands] = detoke(expression);
//     const compute = lookupFromEnv(noperator); // This will later grow into lookp

//     return compute(...noperands);
//   };

//   assertAlmostEquals(dnevalni(program), luminance);
// });

// Baraxolka
// ----------------------

// const operator = ([first]) => first
// const operands = ([_, ...rest]) = rest

// const evals = (apply?(operator, operands))

// const bindings = {
//   'luminance': () => undefined
// }

// const frame = [
//   [Symbol.for("luminance"), () => {}]
// ]

// const env = [
//   [
//     [,]
//   ]
// ]

// const persept = ???

// assertEquals(percept(program), luminance);
