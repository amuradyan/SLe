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

  const tokens = loop(graphemes);

  return typeify(tokens);
};

export const dnevalni = (expression, env = []) => {
  const [noperator, ...noperands] = detoke(expression);

  const lookupFromEnv = () => {
    return env[1];
  };
  const compute = lookupFromEnv(noperator); // This will later grow into lookp

  return compute(...noperands);
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const [program] = Deno.args;

  const env = [
    Symbol.for("luminance"),
    (red, green, blue) => 0.2126 * red + 0.7152 * green + 0.0722 * blue,
  ];

  const result = dnevalni(program, env);

  console.table([{ program, result }], ["program", "result"]);
}
