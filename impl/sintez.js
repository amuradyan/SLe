const AMPLITUDE = 32767;
const SAMPLE_RATE = 1000;

function generateAttack(frequency, fadeSamples, offset) {
  console.log("Generating attack for frequency:", frequency);
  function loop(i, acc) {
    if (i >= fadeSamples) return acc;
    const t = (offset + i) / SAMPLE_RATE;
    const sample = AMPLITUDE * Math.sin(2 * Math.PI * frequency * t) *
      (i / fadeSamples);
    return loop(i + 1, [...acc, sample]);
  }
  return loop(0, []);
}

function generateSustain(frequency, numSamples, offset) {
  console.log("Generating sustain for frequency:", frequency);
  console.log({ offset }, { numSamples });
  function loop(i, acc) {
    if (i >= numSamples) return acc;
    const t = (offset + i) / SAMPLE_RATE;
    const sample = AMPLITUDE * Math.sin(2 * Math.PI * frequency * t);
    return loop(i + 1, [...acc, sample]);
  }
  return loop(0, []);
}

function generateDecay(frequency, fadeSamples, offset) {
  console.log("Generating decay for frequency:", frequency);
  function loop(i, acc) {
    if (i >= fadeSamples) return acc;
    const t = (offset + i) / SAMPLE_RATE;
    const sample = AMPLITUDE * Math.sin(2 * Math.PI * frequency * t) *
      ((fadeSamples - i) / fadeSamples);
    return loop(i + 1, [...acc, sample]);
  }
  return loop(0, []);
}

export function generatePCM(frequency, duration, offset = 0) {
  console.log("Generating PCM for frequency:", frequency);

  const numSamples = SAMPLE_RATE * duration;
  const fadeSamples = Math.floor(SAMPLE_RATE * 0.01); // 10ms fade
  const sustainSamples = numSamples - 2 * fadeSamples;

  console.log("Number of samples:", numSamples);
  console.log("Fade samples:", fadeSamples);
  console.log("Sustain samples:", sustainSamples);
  console.log("Offset:", offset);
  console.log("Duration:", duration);

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

  console.log("Generated PCM samples:", samples.length);

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
    function loop(i) {
      if (i >= str.length) return;
      view.setUint8(offset + i, str.charCodeAt(i));
      loop(i + 1);
    }
    loop(0);
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

  console.log("samples", samples.length);

  for (let i = 0; i < samples.length; i++) {
    view.setInt16(headerSize + i * 2, samples[i], true);
  }

  await Deno.writeFile(
    output,
    new Uint8Array(buffer),
  );
}

// exports.encodeWAV = encodeWAV;
