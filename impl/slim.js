const atom = Symbol.for;

export const detoke = (input) => {
  const graphemes = Array.from(input.trim());

  const loop = (
    progressiveScope,
    [graphemeAtHand, ...restOfGraphemes],
    tokenSoFar = "",
  ) => {
    const [currentScope, parentScope, ...outerScopes] = progressiveScope;

    if (!graphemeAtHand) {
      return currentScope;
    }

    // console.log({
    //   event: "PROCESS_GRAPHEME",
    // });
    // console.log(
    //   `Grapheme at : "${graphemeAtHand}" [${restOfGraphemes}]\n`,
    //   `Token So far: "${tokenSoFar}"`,
    // );
    // console.log({ currentScope });
    // console.log({
    //   parentScope,
    //   outerScopes,
    // });

    const typeify = (token) => {
      const parsedInt = Number.parseInt(token, 10);
      return Number.isNaN(parsedInt) ? Symbol.for(token) : parsedInt;
    };

    switch (graphemeAtHand) {
      case "(": {
        const updatedCurrentScope = tokenSoFar.length > 0
          ? [...currentScope, typeify(tokenSoFar)]
          : currentScope;

        const newProgressiveScope = parentScope && parentScope.length > 0
          ? [[], updatedCurrentScope, parentScope, ...outerScopes]
          : [[], updatedCurrentScope, ...outerScopes];

        // console.log({ updatedCurrentScope });
        // console.log({ newProgressiveScope });

        return loop(
          newProgressiveScope,
          restOfGraphemes,
        );
      }
      case ")": {
        const updatedCurrentScope = tokenSoFar.length > 0
          ? [...currentScope, typeify(tokenSoFar)]
          : currentScope;

        const innerHead = parentScope && parentScope.length > 0
          ? [...parentScope, updatedCurrentScope]
          : updatedCurrentScope;

        const newProgressiveScope = [
          innerHead,
          ...outerScopes,
        ];

        // console.log({ updatedCurrentScope });
        // console.log({ newProgressiveScope });

        return loop(newProgressiveScope, restOfGraphemes, "");
      }
      case " ": {
        const updatedCurrentScope = tokenSoFar.length > 0
          ? [...currentScope, typeify(tokenSoFar)]
          : currentScope;

        const newProgressiveScope = [
          updatedCurrentScope,
          parentScope,
          ...outerScopes,
        ];

        // console.log({ newProgressiveScope });

        return loop(
          newProgressiveScope,
          restOfGraphemes,
        );
      }
      default:
        return loop(
          progressiveScope,
          restOfGraphemes,
          tokenSoFar + graphemeAtHand,
        );
    }
  };

  return loop([[]], graphemes);
};

export const lookupFromEnv = (name, definitions) => {
  const matchingDefinition = definitions.find(([key]) => key === name);
  if (matchingDefinition) {
    return matchingDefinition[1];
  }
};

export const run = (program) => {
  const programAsList = detoke(program);

  console.log({ programAsList });

  return dnevalni(programAsList, definitions);
};

export const dnevalni = (expression, definitions = []) => {
  if (typeof expression === "number") {
    return expression;
  }

  if (typeof expression === "symbol") {
    return lookupFromEnv(expression, definitions);
  }

  if (Array.isArray(expression)) {
    const [noperator, ...noperands] = expression;
    console.log({ noperator }, { noperands });

    const compute = lookupFromEnv(noperator, definitions); // This will later grow into lookup

    console.log({ definitions });

    const evaluatedOperands = noperands.map((nexpression) =>
      dnevalni(nexpression, definitions)
    );

    console.log({ evaluatedOperands });

    return compute(evaluatedOperands);
  }

  console.log({ expression });
  console.log("Error: Unknown expression type.");
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
    (numbers) => {
      console.log({ numbers });
      return numbers.reduce((acc, number) => acc + number, 0);
    },
  ],
  [
    atom("/"),
    ([a, b]) => a / b,
  ],
  [
    atom("a"),
    10,
  ],
];

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const [program] = Deno.args;

  const result = dnevalni(program, definitions);

  console.table([{ program, result }], ["program", "result"]);
}
