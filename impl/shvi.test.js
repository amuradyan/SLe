import { fail } from "@std/assert/fail";
import { run } from "./slim.js";
import { encodeWAV, generatePCM } from "./sintez.js";

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

      console.log("Playing generated WAV file...");
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
                  (sequence (tone F4 1) (tone C4 2) (tone G4 1))
              `;

      const samples = run(music, environment);

      encodeWAV(samples, outputFile);

      console.log("Playing generated WAV file...");
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
                  (sequence (tone F4 1) (tone silence 1) (tone C4 2) (tone G4 1))
              `;

      const samples = run(music, environment);

      encodeWAV(samples, outputFile);

      console.log("Playing generated WAV file...");
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
