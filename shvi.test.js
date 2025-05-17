import { encodeWAV, evaluate, generatePCM, tokenize } from "./sintez.js";

const determinePlayer = (filePath) => {
  switch (Deno.build.os) {
    case "darwin":
      return ["afplay", [filePath]];
    case "windows":
      return ["powershell", ["-c", "Start-Process", filePath]];
    default:
      return ["aplay", [filePath]];
  }
};

const play = async (filePath) => {
  const [player, args] = determinePlayer(filePath);

  const process = new Deno.Command(player, {
    args,
    stdout: "inherit",
    stderr: "inherit",
  }).spawn();

  await process.output();
};

Deno.test("Playing things", async (t) => {
  await t.step({
    name: "playing 261.63 Hz /C4/ for one second",
    fn: async () => {
      const frequency = 261.63; // C4
      const duration = 1000; // 1 second

      const samples = generatePCM(frequency, duration);

      encodeWAV(samples);

      console.log("Playing generated WAV file...");
      await play("output.wav");
    },
    ignore: true,
  });

  await t.step({
    name: "playing a D4 for two seconds",
    fn: async () => {
      const music = `
            (tone 293.66 200)
          `;

      const tokens = tokenize(music);
      const samples = evaluate(tokens[0]);

      encodeWAV(samples);

      console.log("Playing generated WAV file...");
      await play("output.wav");
    },
    ignore: true,
  });

  await t.step({
    name:
      "playing an F4 for one second, a C4 for two seconds, and a G4 for one second",
    fn: async () => {
      const music = `
                  (sequence (tone 349.23 100) (tone 261.63 200) (tone 392.00 100))
              `;

      const tokens = tokenize(music);
      const samples = evaluate(tokens[0]);

      encodeWAV(samples);

      console.log("Playing generated WAV file...");
      await play("output.wav");
    },
    ignore: false,
  });
});
