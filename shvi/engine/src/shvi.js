import { log } from "./logger.js";

export const tokenize = (input) => {
  const graphemes = Array.from(input.trim());

  const loop = (
    progressiveScope,
    [graphemeAtHand, ...restOfGraphemes],
    tokenSoFar = "",
  ) => {
    const [currentScope, parentScope, ...outerScopes] = progressiveScope;

    const typeify = (token) => {
      const parsedInt = Number.parseInt(token, 10);
      return Number.isNaN(parsedInt) ? Symbol.for(token) : parsedInt;
    };

    if (!graphemeAtHand) {
      return tokenSoFar.length > 0
        ? [...currentScope, typeify(tokenSoFar)]
        : currentScope;
    }

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
      case "\t":
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

export const environmentLookup = (name, definitions) => {
  const matchingDefinition = definitions.find(([key]) => key === name);
  if (matchingDefinition) {
    return matchingDefinition[1];
  } else {
    const errorMessage = `🪈 |Shvi| Error: Unknown name ....... \`${
      Symbol.keyFor(name)
    }\``;
    console.error();
    return errorMessage;
  }
};

export const evaluate = (expression, definitions = []) => {
  log.debug({ expression });

  if (typeof expression === "number") {
    return expression;
  }

  if (typeof expression === "symbol") {
    return environmentLookup(expression, definitions);
  }

  if (Array.isArray(expression)) {
    const [operator, ...operands] = expression;
    log.debug({ operator }, { operands });

    const compute = environmentLookup(operator, definitions);
    log.debug({ compute });

    log.debug({ definitions });

    const evaluatedOperands = operands.map((expression) =>
      evaluate(expression, definitions)
    );

    log.debug({ evaluatedOperands });

    return compute(...evaluatedOperands);
  }

  log.debug({ expression });
  log.debug("Error: Unknown expression type.");
};

export const run = (
  program,
  definitions = dangerousDefinitions,
) => {
  const programAsList = tokenize(program);

  return evaluate(programAsList, definitions);
};
