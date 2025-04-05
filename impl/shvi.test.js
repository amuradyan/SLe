import { fail } from "@std/assert/fail";
import { run } from "./slim.js";

Deno.test("Playing things", async (t) => {
  await t.step({
    name: "playing a C4 for two seconds",
    fn: async () => {
      const code = `
            (tone C4 2)
          `;

      //   run(code);

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
