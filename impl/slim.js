const atom = Symbol.for;

export const detoke = (input) => {
  const graphemes = Array.from(input.trim());

  const loop = (
    [graphemeAtHand, ...restOfGraphemes],
    tokenSoFar = "",
    progressiveScope = [[]],
  ) => {
    const [currentScope, parentScope, ...outerScopes] = progressiveScope;

    if (!graphemeAtHand) {
      // console.log("End of input stream", progressiveScope);
      // return tokenSoFar.length > 0
      //   ? [...currentScope, tokenSoFar]
      //   : currentScope;
      return currentScope;
    }

    console.log({
      event: "PROCESS_GRAPHEME",
    });
    console.log(
      `Grapheme at : "${graphemeAtHand}" [${restOfGraphemes}]\n`,
      `Token So far: "${tokenSoFar}"`,
    );
    console.log({ currentScope });
    console.log({
      parentScope,
      outerScopes,
    });

    switch (graphemeAtHand) {
      case "(": {
        const updatedCurrentScope = tokenSoFar.length > 0
          ? [...currentScope, tokenSoFar]
          : currentScope;

        const newProgressiveScope = parentScope && parentScope.length > 0
          ? [[], updatedCurrentScope, parentScope, ...outerScopes]
          : [[], updatedCurrentScope, ...outerScopes];

        console.log({ updatedCurrentScope });
        console.log({ newProgressiveScope });

        return loop(
          restOfGraphemes,
          "",
          newProgressiveScope,
        );
      }
      case ")": {
        const updatedCurrentScope = tokenSoFar.length > 0
          ? [...currentScope, tokenSoFar]
          : currentScope;

        const innerHead = parentScope && parentScope.length > 0
          ? [...parentScope, updatedCurrentScope]
          : updatedCurrentScope;

        const newProgressiveScope = [
          innerHead,
          ...outerScopes,
        ];

        console.log({ updatedCurrentScope });
        console.log({ newProgressiveScope });

        return loop(restOfGraphemes, "", newProgressiveScope);
      }
      case " ": {
        const updatedCurrentScope = tokenSoFar.length > 0
          ? [...currentScope, tokenSoFar]
          : currentScope;

        const newProgressiveScope = [
          updatedCurrentScope,
          parentScope,
          ...outerScopes,
        ];

        console.log({ newProgressiveScope });

        return loop(
          restOfGraphemes,
          "",
          newProgressiveScope,
        );
      }
      default:
        return loop(
          restOfGraphemes,
          tokenSoFar + graphemeAtHand,
          progressiveScope,
        );
    }
  };

  // We assume that the expressions are of form (name number number number)
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
  console.log({ noperator }, { noperands });

  // -> [[+ [/ 1 2 3]]]

  const compute = lookupFromEnv(noperator, definitions); // This will later grow into lookup

  console.log({ definitions });

  // [+ 1 2]

  // tokens: [+ [/ 1 2 3]]
  // fn+ [1,1]
  return compute(...noperands);
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
    (...numbers) => {
      console.log({ numbers });
      return numbers.reduce((acc, number) => acc + number, 0);
    },
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
