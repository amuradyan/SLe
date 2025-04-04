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
      case " ":
      case "\n": {
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
  } else {
    console.log("Error: Unknown ", name);
    return null;
  }
};

export const run = (
  program,
  definitions = dangerousDefinitions,
) => {
  const programAsList = detoke(program);

  return dnevalni(programAsList, definitions);
};

export const dnevalni = (expression, definitions = []) => {
  // console.log({ expression });

  if (typeof expression === "number") {
    return expression;
  }

  if (typeof expression === "symbol") {
    return lookupFromEnv(expression, definitions);
  }

  if (Array.isArray(expression)) {
    const [noperator, ...noperands] = expression;
    console.log({ noperator }, { noperands });

    const compute = lookupFromEnv(noperator, definitions);
    console.log({ compute }); // This will later grow into lookup

    // console.log({ definitions });

    const evaluatedOperands = noperands.map((nexpression) =>
      dnevalni(nexpression, definitions)
    );

    // console.log({ evaluatedOperands });

    return compute(...evaluatedOperands);
  }

  console.log({ expression });
  console.log("Error: Unknown expression type.");
};

// word -> words, start from one go to many

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const [program] = Deno.args;

  const result = dnevalni(program, dangerousDefinitions);

  console.table([{ program, result }], ["program", "result"]);
}
