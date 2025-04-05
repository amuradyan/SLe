import { encodeWAV, generatePCM } from "./generatePCM.js";

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

function sampleHappyBirthday(melody, bass, durationPerNote) {
  function loop(i, globalOffset, acc) {
    if (i >= melody.length) return new Int16Array(acc);
    const melodyPCM = generatePCM(melody[i], durationPerNote, globalOffset);
    const bassPCM = generatePCM(bass[i], durationPerNote, globalOffset);
    const combined = Array.from(melodyPCM).flatMap((m, j) => [m, bassPCM[j]]);
    return loop(i + 1, globalOffset + melodyPCM.length, [...acc, ...combined]);
  }
  return loop(0, 0, []);
}

const durationPerNote = 0.5;
const birthdayPCM = sampleHappyBirthday(
  happyBirthday,
  bassline,
  durationPerNote,
);
const birthdayBuffer = encodeWAV(birthdayPCM);
await Deno.writeFile(
  "happy_birthday_stereo.wav",
  new Uint8Array(birthdayBuffer),
);

function renderOFortuna() {
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

  function loop(i, globalOffset, acc) {
    if (i >= melody.length) return new Int16Array(acc);
    const melodyPCM = generatePCM(melody[i], durations[i], globalOffset);
    const bassPCM = generatePCM(C3, durations[i], globalOffset);
    const combined = (() => {
      let result = [];
      for (let j = 0; j < melodyPCM.length; j++) {
        result.push(melodyPCM[j], bassPCM[j]);
      }
      return result;
    })();
    return loop(i + 1, globalOffset + melodyPCM.length, [...acc, ...combined]);
  }

  return loop(0, 0, []);
}

// const fortunaPCM = renderOFortuna();
// const fortunaBuffer = encodeWAV(fortunaPCM);
// await Deno.writeFile("o_fortuna.wav", new Uint8Array(fortunaBuffer));
