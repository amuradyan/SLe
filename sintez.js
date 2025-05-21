export { encodeWAV, evaluate, generatePCM, tokenize, typeify };

const AMPLITUDE = 32767;
const SAMPLE_RATE = 44100;

// sample[n]= A ⋅ sin(2 * π * f * (n / R)​)

// Where:
//   A: Amplitude (max value based on bit depth, e.g., 32767 for 16-bit)
//   f: Frequency (Hz), e.g., middle C = 261.63 Hz
//   R: Sample rate (samples per second), typically 44100 Hz
//   n: Sample number (integer), from 0 to R × duration − 1

function generatePCM(frequency, duration, offset = 0) {
  function generateAttack(frequency, fadeSamples, offset) {
    const samples = [];
    for (let i = 0; i < fadeSamples; i++) {
      const t = (offset + i) / SAMPLE_RATE;
      const sample = AMPLITUDE * Math.sin(2 * Math.PI * frequency * t) *
        (i / fadeSamples);
      samples.push(sample);
    }
    return samples;
  }

  function generateSustain(frequency, numSamples, offset) {
    const samples = [];
    for (let i = 0; i < numSamples; i++) {
      const t = (offset + i) / SAMPLE_RATE;
      const sample = AMPLITUDE * Math.sin(2 * Math.PI * frequency * t);
      samples.push(sample);
    }
    return samples;
  }

  function generateDecay(frequency, fadeSamples, offset) {
    const samples = [];

    for (let i = 0; i < fadeSamples; i++) {
      const t = (offset + i) / SAMPLE_RATE;
      const sample = AMPLITUDE * Math.sin(2 * Math.PI * frequency * t) *
        ((fadeSamples - i) / fadeSamples);
      samples.push(sample);
    }

    return samples;
  }

  const numSamples = Math.floor(SAMPLE_RATE * (duration / 1000));
  const fadeSamples = Math.floor(SAMPLE_RATE * 0.01); // 10ms fade
  const sustainSamples = numSamples - 2 * fadeSamples;

  const attack = generateAttack(frequency, fadeSamples, offset);
  const sustain = generateSustain(
    frequency,
    sustainSamples,
    offset + fadeSamples,
  );
  const decay = generateDecay(
    frequency,
    fadeSamples,
    offset + fadeSamples + sustainSamples,
  );

  const samples = new Int16Array([...attack, ...sustain, ...decay]);

  return samples;
}

function sequence(...tones) {
  const samples = [];
  for (const tone of tones) {
    for (const PCM of tone) {
      samples.push(PCM);
    }
  }
  return samples;
}

async function encodeWAV(
  samples,
  output = "output.wav",
  sampleRate = 44100,
) {
  const headerSize = 44;
  const dataSize = samples.length * 2;
  const buffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(buffer);

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  for (let i = 0; i < samples.length; i++) {
    view.setInt16(headerSize + i * 2, samples[i], true);
  }

  await Deno.writeFile(
    output,
    new Uint8Array(buffer),
  );
}

const typeify = (token) => {
  const parsedNumber = Number.parseFloat(token, 10);
  return Number.isNaN(parsedNumber) ? Symbol.for(token) : parsedNumber;
};

const atom = (name) => Symbol.for(name);

const tokenize = (input) => {
  const graphemes = Array.from(input.trim());

  const loop = (
    progressiveScope,
    [graphemeAtHand, ...restOfGraphemes],
    tokenSoFar = "",
  ) => {
    const [currentScope, parentScope, ...outerScopes] = progressiveScope;

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
      case " ": {
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

const evaluate = (expression) => {
  if (typeof expression === "number") {
    return expression;
  }

  if (Array.isArray(expression)) {
    const [operator, ...operands] = expression;

    switch (operator) {
      case atom("tone"):
        return generatePCM(...operands);
      case atom("sequence"): {
        const tonePCMs = operands.map(evaluate);
        return sequence(tonePCMs);
      }
      case atom("parallel"): {
        throw new Error(
          "🪈 Error: Parallel is not implemented yet",
        );
      }
      default:
        throw new Error(
          `🪈 Error: Unknown operator ....... \`${Symbol.keyFor(operator)}\``,
        );
    }
  }
};
