import { encodeWAV, generatePCM } from "./sintez.js";

Deno.test("Playing things", async (t) => {
  await t.step({
    name: "playing 261.63 Hz /C4/ for one second",
    fn: async () => {
      const frequency = 261.63; // C4
      const duration = 1000; // 1 second

      const samples = generatePCM(frequency, duration);

      encodeWAV(samples);

      console.log("Playing generated WAV file...");
      const process = new Deno.Command("aplay", {
        args: ["output.wav"],
        stdout: "inherit",
        stderr: "inherit",
      }).spawn();

      await process.output();
    },
    ignore: false,
  });
});
