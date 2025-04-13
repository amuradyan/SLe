import { run } from "../src/shvi.js";
import { encodeWAV } from "../src/sintez.js";
import { log } from "../src/logger.js";

Deno.test("Playing things", async (t) => {
  await t.step({
    name: "playing a C4 for two seconds",
    fn: async () => {
      const outputFile = "C4-for-2-seconds.wav";

      const music = `
            (tone C4 200)
          `;

      const samples = run(music);

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

      const samples = run(music);

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

      const samples = run(sourceCode);

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

      const samples = run(music);

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
    name: "play C4 and F4 at the same time for 2 seconds",
    fn: async () => {
      const outputFile = "C4-F4-for-2-seconds.wav";

      const music = `
                  (parallel (tone C4 2000) (tone F4 2000))
              `;

      const samples = run(music);

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
