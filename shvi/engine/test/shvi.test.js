import { run } from "../src/slim.js";
import { encodeWAV, generatePCM } from "../src/sintez.js";
import { log } from "../src/logger.js";

const atom = Symbol.for;

const environment = [
  [atom("silence"), 0],
  [atom("C4"), 261.63],
  [atom("G4"), 392.0],
  [atom("F4"), 349.23],
  [atom("tone"), (frequency, duration) => generatePCM(frequency, duration)],
  [atom("sequence"), (...args) => {
    const samples = [];
    for (const arg of args) {
      samples.push(...arg);
    }
    return samples;
  }],

  // Note frequencies - full octave coverage from C3 to B5
  // Octave 3 (lower)
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

  // Octave 4 (middle)
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

  // Octave 5 (higher)
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
];

Deno.test("Playing things", async (t) => {
  await t.step({
    name: "playing a C4 for two seconds",
    fn: async () => {
      const outputFile = "C4-for-2-seconds.wav";

      const music = `
            (tone C4 2)
          `;

      const samples = run(music, environment);

      encodeWAV(samples, outputFile);

      log.debug("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: [outputFile],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();
    },
    ignore: true,
  });

  await t.step({
    name:
      "playing an F4 for one second, a C4 for two seconds, and a G4 for one second",
    fn: async () => {
      const outputFile = "F4-C4-G4-for-2-seconds.wav";

      const music = `
                  (sequence (tone F4 100) (tone C4 200) (tone G4 100))
              `;

      const samples = run(music, environment);

      encodeWAV(samples, outputFile);

      log.debug("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: [outputFile],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();
    },
    ignore: true,
  });

  await t.step({
    name: "play twinkle twinkle from file",
    fn: async () => {
      const inputFile = "./fixtures/twinkle-twinkle.shvi";
      const sourceCode = await Deno.readTextFile(inputFile);

      const samples = run(sourceCode, environment);

      const outputFile = "twinkle-twinkle.wav";

      encodeWAV(samples, outputFile);

      log.debug("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: [outputFile],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();
    },
    ignore: true,
  });

  await t.step({
    name:
      "playing an F4 for one second, a silence for one second, a C4 for two seconds, and a G4 for one second",
    fn: async () => {
      const outputFile = "F4-C4-G4-for-2-seconds.wav";

      const music = `
                  (sequence (tone F4 500) (tone silence 1500) (tone C4 2500) (tone G4 1500))
              `;

      const samples = run(music, environment);

      encodeWAV(samples, outputFile);

      log.debug("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: [outputFile],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();
    },
    ignore: true,
  });
});
