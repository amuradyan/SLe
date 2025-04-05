// // test.ts
// import { evaluate, parse } from "./shvi.js";
// import { encodeWAV } from "./sintez.js";

// Deno.test.ignore("Shvi code to PC audio - full cycle", async (t) => {
//   const inputFilePath = "play.shvi";
//   let sourceCode;
//   let samples;
//   let wavBuffer;

//   await t.step("read input file path", async () => {
//     sourceCode = await Deno.readTextFile(inputFilePath);
//     // Create a basic tone example if file doesn't exist yet
//     if (!sourceCode) {
//       sourceCode = "(tone C4 2)";
//       await Deno.writeTextFile(inputFilePath, sourceCode);
//     }
//   });

//   await t.step("evaluate the code", async () => {
//     const ast = parse(sourceCode);
//     samples = await evaluate(ast);
//     // Should return an array of normalized audio samples (-1 to 1)
//   });

//   await t.step("encode audio file as wav", async () => {
//     wavBuffer = encodeWAV(samples, { sampleRate: 44100, channels: 1 });
//     await Deno.writeFile("output.wav", wavBuffer);
//   });

//   await t.step("play the audio on PC speaker", async () => {
//     const command = new Deno.Command("aplay", {
//       args: ["output.wav"],
//     });
//     const { success } = await command.output();
//     console.assert(success, "Failed to play audio");
//   });
// });
