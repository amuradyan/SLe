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

function generatePCM(frequency, duration, offset) {
  const numSamples = SAMPLE_RATE * duration;
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

  return new Int16Array([...attack, ...sustain, ...decay]);
}

function encodeWAV(samples, sampleRate = SAMPLE_RATE) {
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

  return buffer;
}

const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.0;
const A4 = 440.0;
const Bb4 = 466.16;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const F5 = 698.46;
const G5 = 783.99;
const A5 = 880.00;
const C3 = 130.81;
const F3 = 174.61;
const G3 = 196.0;

// deno-fmt-ignore
const happyBirthday = [
  C4, C4, D4, C4, F4, E4,
  C4, C4, D4, C4, G4, F4,
  C4, C4, C5, A4, F4, E4, D4,
  Bb4, Bb4, A4, F4, G4, F4,
];

// deno-fmt-ignore
const bassline = [
  C3, C3, G3, C3, F3, C3,
  C3, C3, G3, C3, G3, C3,
  F3, F3, C3, F3, C3, G3, C3,
  G3, F3, F3, C3, G3, C3,
];

function renderMelody(melody, bass, durationPerNote) {
  let globalOffset = 0;
  const stereoPCM = [];
  for (let i = 0; i < melody.length; i++) {
    const melodyPCM = generatePCM(melody[i], durationPerNote, globalOffset);
    const bassPCM = generatePCM(bass[i], durationPerNote, globalOffset);
    for (let j = 0; j < melodyPCM.length; j++) {
      stereoPCM.push(melodyPCM[j]);
      stereoPCM.push(bassPCM[j]);
    }
    globalOffset += melodyPCM.length;
  }
  return new Int16Array(stereoPCM);
}

const durationPerNote = 0.5;
const birthdayPCM = renderMelody(happyBirthday, bassline, durationPerNote);
const birthdayBuffer = encodeWAV(birthdayPCM);
await Deno.writeFile(
  "happy_birthday_stereo.wav",
  new Uint8Array(birthdayBuffer),
);

function renderOFortuna() {
  // Carmina Burana "O Fortuna" melody excerpt (simplified, more accurate)
  // deno-fmt-ignore
  const melody = [
    C5, C5, A4, C5, C5, A4,
    C5, D5, E5, E5, F5, E5,
    D5, C5, A4, A4, C5, D5,
    E5, D5, C5,
  ];

  // deno-fmt-ignore
  const durations = [
    0.25, 0.25, 0.5, 0.25, 0.25, 0.5,
    0.5, 0.25, 0.25, 0.25, 0.25, 0.5,
    0.5, 0.5, 0.5, 0.5, 0.25, 0.25,
    0.5, 0.5, 1.0,
  ];

  let globalOffset = 0;
  const stereoPCM = [];

  for (let i = 0; i < melody.length; i++) {
    const melodyPCM = generatePCM(melody[i], durations[i], globalOffset);
    const bassPCM = generatePCM(C3, durations[i], globalOffset); // simple static bass
    for (let j = 0; j < melodyPCM.length; j++) {
      stereoPCM.push(melodyPCM[j]);
      stereoPCM.push(bassPCM[j]);
    }
    globalOffset += melodyPCM.length;
  }

  return new Int16Array(stereoPCM);
}

const fortunaPCM = renderOFortuna();
const fortunaBuffer = encodeWAV(fortunaPCM);
await Deno.writeFile("o_fortuna.wav", new Uint8Array(fortunaBuffer));
