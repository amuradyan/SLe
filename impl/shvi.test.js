import { fail } from "@std/assert/fail";
import { run } from "./slim.js";
import { encodeWAV, generatePCM } from "./sintez.js";

const atom = Symbol.for;

const environment = [
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
      const music = `
            (tone C4 2)
          `;

      const samples = run(music, environment);

      encodeWAV(samples, "C4-for-2-seconds.wav");

      console.log("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: ["C4-for-2-seconds.wav"],
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
      const music = `
                (sequence (tone F4 1) (tone C4 2) (tone G4 1))
            `;

      const samples = run(music, environment);

      encodeWAV(samples, "F4-C4-G4-for-2-seconds.wav");

      console.log("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: ["F4-C4-G4-for-2-seconds.wav"],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();
    },
  });
});
