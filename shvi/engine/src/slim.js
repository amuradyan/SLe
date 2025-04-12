import { log } from "./logger.js";

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

        log.debug({ updatedCurrentScope });
        log.debug({ newProgressiveScope });

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

        log.debug({ newProgressiveScope });

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
    log.debug("Error: Unknown ", name);
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
  log.debug({ expression });

  if (typeof expression === "number") {
    return expression;
  }

  if (typeof expression === "symbol") {
    return lookupFromEnv(expression, definitions);
  }

  if (Array.isArray(expression)) {
    const [noperator, ...noperands] = expression;
    log.debug({ noperator }, { noperands });

    const compute = lookupFromEnv(noperator, definitions);
    log.debug({ compute });

    log.debug({ definitions });

    const evaluatedOperands = noperands.map((nexpression) =>
      dnevalni(nexpression, definitions)
    );

    log.debug({ evaluatedOperands });

    return compute(...evaluatedOperands);
  }

  log.debug({ expression });
  log.debug("Error: Unknown expression type.");
};

// word -> words, start from one go to many

if (import.meta.main) {
  const [program] = Deno.args;

  const result = dnevalni(program, dangerousDefinitions);

  console.table([{ program, result }], ["program", "result"]);
}
