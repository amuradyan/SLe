const atom = Symbol.for;

export const detoke = (input) => {
  const graphemes = Array.from(input.trim());

  const loop = (
    [graphemeAtHand, ...restOfGraphemes],
    tokens = [],
    tokenSoFar = "",
  ) => {
    if (!graphemeAtHand) {
      return tokenSoFar.length > 0 ? [...tokens, tokenSoFar] : tokens;
    }

    // (+ (/ 1 2 3)) []
    // ( -> [][]
    // + -> [][+]
    // ( -> [][+][]
    // / -> [][+][/]
    // 1 -> [][+][/ 1]
    // 2 -> [][+][/ 1 2]
    // 3 -> [][+][/ 1 2 3]
    // ) -> [][+ [/ 1 2 3]]
    // ) -> [[+ [/ 1 2 3]]]

    // trunx

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

  // We assume that the exoressins are of form (name number number number ...)
  // We, now have to parse (name (name number number number))
  const typeify = ([operator, ...rest]) => {
    const args = rest.map((x) => Number.parseInt(x));
    return [atom(operator), ...args];
  };

  const tokens = loop(graphemes);

  return typeify(tokens);
};

export const lookupFromEnv = (name, definitions) => {
  const matchingDefinition = definitions.find(([key]) => key === name);
  if (matchingDefinition) {
    return matchingDefinition[1];
  }
};

export const dnevalni = (expression, definitions = []) => {
  // + (/ 1 2 3)) []

  const [noperator, ...noperands] = detoke(expression);

  // -> [[+ [/ 1 2 3]]]

  const compute = lookupFromEnv(noperator, definitions); // This will later grow into lookup

  // [+ 1 2]

  // tokens: [+ [/ 1 2 3]]
  // fn+ [1,1]
  return compute(evlist(...noperands, definitions));
};

// word -> words, start from one go to many

export const definitions = [
  [
    atom("luminance"),
    (red, green, blue) => 0.2126 * red + 0.7152 * green + 0.0722 * blue,
  ],
  [
    atom("average-brightness"),
    (red, green, blue) => (red + green + blue) / 3,
  ],
  [
    atom("+"),
    (a, b) => a + b,
  ],
  [
    atom("/"),
    (a, b) => a / b,
  ],
];

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const [program] = Deno.args;

  const result = dnevalni(program, definitions);

  console.table([{ program, result }], ["program", "result"]);
}

////
// (())
