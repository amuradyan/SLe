export { encodeWAV, generatePCM };

import { log } from "./logger.js";

const AMPLITUDE = 32767;
const SAMPLE_RATE = 44100;

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

function generatePCM(frequency, duration, offset = 0) {
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

async function encodeWAV(
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

  for (let i = 0; i < samples.length; i++) {
    view.setInt16(headerSize + i * 2, samples[i], true);
  }

  await Deno.writeFile(
    output,
    new Uint8Array(buffer),
  );
}
