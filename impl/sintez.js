const AMPLITUDE = 32767;
const SAMPLE_RATE = 44100;

function generateAttack(frequency, fadeSamples, offset) {
  // console.log("Generating attack for frequency:", frequency);

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

export function generatePCM(frequency, duration, offset = 0) {
  // console.log("Generating PCM for frequency:", frequency);

  const numSamples = Math.floor(SAMPLE_RATE * (duration / 1000));
  const fadeSamples = Math.floor(SAMPLE_RATE * 0.01); // 10ms fade
  const sustainSamples = numSamples - 2 * fadeSamples;

  // console.log("Number of samples:", numSamples);
  // console.log("Fade samples:", fadeSamples);
  // console.log("Sustain samples:", sustainSamples);
  // console.log("Offset:", offset);
  // console.log("Duration:", duration);

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

export async function encodeWAV(
  samples,
  output = "output.wav",
  sampleRate = SAMPLE_RATE,
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

  // console.log("samples", samples.length);

  for (let i = 0; i < samples.length; i++) {
    view.setInt16(headerSize + i * 2, samples[i], true);
  }

  await Deno.writeFile(
    output,
    new Uint8Array(buffer),
  );
}

// exports.encodeWAV = encodeWAV;
const atom = Symbol.for;

export const environment = [
  // Core functions
  [atom("silence"), (duration) => generatePCM(0, duration)],
  [atom("tone"), (frequency, duration) => generatePCM(frequency, duration)],
  [atom("sequence"), (...args) => {
    const samples = [];
    for (const arg of args) {
      samples.push(...arg);
    }
    return samples;
  }],
  // [atom("chord"), ([notes], duration) => {}]

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

  // High notes
  [atom("G#6"), 1661.22],
  [atom("A6"), 1760.00],
  [atom("A#6"), 1864.66],
  [atom("F6"), 1396.91],
  [atom("F#6"), 1479.98],
  [atom("E6"), 1318.51],
  [atom("D#6"), 1244.51],
  [atom("C#6"), 1108.73],

  // Medium-high notes
  [atom("B5"), 987.77],
  [atom("A5"), 880.00],
  [atom("G#5"), 830.61],

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
