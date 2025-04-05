import { fail } from "@std/assert/fail";
import { run } from "./slim.js";
import { encodeWAV, generatePCM } from "./sintez.js";

const atom = Symbol.for;

const environment = [
  [atom("C4"), 261.63],
  [atom("tone"), (frequency, duration) => generatePCM(frequency, duration)],
];

Deno.test("Playing things", async (t) => {
  await t.step({
    name: "playing a C4 for two seconds",
    fn: async () => {
      const music = `
            (tone C4 2)
          `;

      const samples = run(music, environment);

      console.log("Samples:", samples);

      encodeWAV(samples, "C4-for-2-seconds.wav");

      console.log("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: ["C4-for-2-seconds.wav"],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();

      fail(
        "This test is not implemented yet. Please implement it.",
      );
    },
  });
});
