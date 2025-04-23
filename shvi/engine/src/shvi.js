export { environmentLookup, evaluate, run, tokenize };

import { generatePCM } from "./sintez.js";

const tokenize = (input) => {
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

        const newProgressiveScope = parentScope
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

        const innerHead = parentScope
          ? [...parentScope, updatedCurrentScope]
          : updatedCurrentScope;

        const newProgressiveScope = [
          innerHead,
          ...outerScopes,
        ];

        return loop(newProgressiveScope, restOfGraphemes, "");
      }
      case ";": {
        const newlineIndex = restOfGraphemes.indexOf("\n");

        if (newlineIndex === -1) {
          return loop(
            progressiveScope,
            [],
            tokenSoFar,
          );
        }

        return loop(
          progressiveScope,
          restOfGraphemes.slice(newlineIndex + 1),
          tokenSoFar,
        );
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

const environmentLookup = (name, definitions) => {
  const matchingDefinition = [...definitions, ...prelude].find(([key]) =>
    key === name
  );

  if (matchingDefinition) {
    return matchingDefinition[1];
  } else {
    const errorMessage = `🪈 Error: Unknown name ....... \`${
      Symbol.keyFor(name)
    }\``;
    console.error(errorMessage);
    return errorMessage;
  }
};

const updateEnvironment = (name, value, definitions) => [
  [name, value],
  ...definitions,
];

const evaluate = (expression, definitions = []) => {
  if (typeof expression === "number") {
    return expression;
  }

  if (typeof expression === "symbol") {
    return environmentLookup(expression, definitions);
  }

  if (Array.isArray(expression)) {
    const [operator, ...operands] = expression;

    if (Array.isArray(operator) && operator[0] === atom("define")) {
      const [_, name, value] = operator;

      const evaluatedValue = evaluate(value, definitions);

      const newEnvironment = updateEnvironment(
        name,
        evaluatedValue,
        definitions,
      );

      if (operands.length === 1) {
        return evaluate(operands[0], newEnvironment);
      } else {
        return evaluate(operands, newEnvironment);
      }
    } else {
      const compute = environmentLookup(operator, definitions);

      const evaluatedOperands = operands.map((expression) =>
        evaluate(expression, definitions)
      );

      return compute(...evaluatedOperands);
    }
  }
};

const run = (
  program,
  definitions = [],
) => {
  const programAsList = tokenize(program);

  if (programAsList.length === 1) {
    return evaluate(programAsList[0], definitions);
  } else {
    return evaluate(programAsList, definitions);
  }
};

const atom = Symbol.for;

const prelude = [
  // Core functions
  [atom("silence"), (duration) => generatePCM(0, duration)],
  [atom("tone"), (frequency, duration) => generatePCM(frequency, duration)],
  [atom("repeat"), (times, sequence) => {
    const samples = [];
    for (let i = 0; i < times; i++) {
      for (const x of sequence) {
        samples.push(x);
      }
    }
    return samples;
  }],
  [atom("sequence"), (...args) => {
    const samples = [];
    for (const arg of args) {
      for (const x of arg) {
        samples.push(x);
      }
    }
    return samples;
  }],
  [atom("parallel"), (...args) => {
    const samples = [];
    const maxLength = Math.max(...args.map((arg) => arg.length));
    for (let i = 0; i < maxLength; i++) {
      const samplesAtI = args.map((arg) => arg[i] || 0);
      const averageSample = samplesAtI.reduce((acc, sample) =>
        acc + sample, 0) /
        samplesAtI.length;

      samples.push(averageSample);
    }
    return samples;
  }],

  // Notes - Octave 1 (Very Low)
  [atom("C1"), 32.70],
  [atom("C#1"), 34.65],
  [atom("D1"), 36.71],
  [atom("D#1"), 38.89],
  [atom("E1"), 41.20],
  [atom("F1"), 43.65],
  [atom("F#1"), 46.25],
  [atom("G1"), 49.00],
  [atom("G#1"), 51.91],
  [atom("A1"), 55.00],
  [atom("A#1"), 58.27],
  [atom("B1"), 61.74],

  // Notes - Octave 2 (Low)
  [atom("C2"), 65.41],
  [atom("C#2"), 69.30],
  [atom("D2"), 73.42],
  [atom("D#2"), 77.78],
  [atom("E2"), 82.41],
  [atom("F2"), 87.31],
  [atom("F#2"), 92.50],
  [atom("G2"), 98.00],
  [atom("G#2"), 103.83],
  [atom("A2"), 110.00],
  [atom("A#2"), 116.54],
  [atom("B2"), 123.47],

  // Notes - Octave 3 (Mid-Low)
  [atom("C3"), 130.81],
  [atom("C#3"), 138.59],
  [atom("D3"), 146.83],
  [atom("D#3"), 155.56],
  [atom("E3"), 164.81],
  [atom("F3"), 174.61],
  [atom("F#3"), 185.00],
  [atom("G3"), 196.00],
  [atom("G#3"), 207.65],
  [atom("A3"), 220.00],
  [atom("A#3"), 233.08],
  [atom("B3"), 246.94],

  // Notes - Octave 4 (Middle)
  [atom("C4"), 261.63],
  [atom("C#4"), 277.18],
  [atom("D4"), 293.66],
  [atom("D#4"), 311.13],
  [atom("E4"), 329.63],
  [atom("F4"), 349.23],
  [atom("F#4"), 369.99],
  [atom("G4"), 392.00],
  [atom("G#4"), 415.30],
  [atom("A4"), 440.00],
  [atom("A#4"), 466.16],
  [atom("B4"), 493.88],

  // Notes - Octave 5 (Mid-High)
  [atom("C5"), 523.25],
  [atom("C#5"), 554.37],
  [atom("D5"), 587.33],
  [atom("D#5"), 622.25],
  [atom("E5"), 659.26],
  [atom("F5"), 698.46],
  [atom("F#5"), 739.99],
  [atom("G5"), 783.99],
  [atom("G#5"), 830.61],
  [atom("A5"), 880.00],
  [atom("A#5"), 932.33],
  [atom("B5"), 987.77],

  // Notes - Octave 6 (High)
  [atom("G#6"), 1661.22],
  [atom("A6"), 1760.00],
  [atom("A#6"), 1864.66],
  [atom("B6"), 1975.53],
  [atom("C6"), 1046.50],
  [atom("C#6"), 1108.73],
  [atom("D6"), 1174.66],
  [atom("D#6"), 1244.51],
  [atom("E6"), 1318.51],
  [atom("F6"), 1396.91],
  [atom("F#6"), 1479.98],
  [atom("G6"), 1567.98],

  // Aliases for flats (for musical convenience)
  [atom("Db1"), 34.65],
  [atom("Eb1"), 38.89],
  [atom("Gb1"), 46.25],
  [atom("Ab1"), 51.91],
  [atom("Bb1"), 58.27],
  [atom("Db2"), 69.30],
  [atom("Eb2"), 77.78],
  [atom("Gb2"), 92.50],
  [atom("Ab2"), 103.83],
  [atom("Bb2"), 116.54],
  [atom("Db3"), 138.59],
  [atom("Eb3"), 155.56],
  [atom("Gb3"), 185.00],
  [atom("Ab3"), 207.65],
  [atom("Bb3"), 233.08],
  [atom("Db4"), 277.18],
  [atom("Eb4"), 311.13],
  [atom("Gb4"), 369.99],
  [atom("Ab4"), 415.30],
  [atom("Bb4"), 466.16],
  [atom("Db5"), 554.37],
  [atom("Eb5"), 622.25],
  [atom("Gb5"), 739.99],
  [atom("Ab5"), 830.61],
  [atom("Bb5"), 932.33],

  // Common instrument presets (for better sound)
  [atom("piano"), {
    waveform: "triangle",
    attackTime: 0.005,
    decayTime: 0.1,
    sustainLevel: 0.7,
    releaseTime: 0.3,
  }],

  [atom("synth"), {
    waveform: "sawtooth",
    attackTime: 0.01,
    decayTime: 0.05,
    sustainLevel: 0.8,
    releaseTime: 0.1,
  }],

  [atom("organ"), {
    waveform: "square",
    attackTime: 0.02,
    decayTime: 0.01,
    sustainLevel: 0.9,
    releaseTime: 0.05,
  }],
];
