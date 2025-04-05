import { fail } from "@std/assert/fail";

Deno.test("playing a C4 for two seconds", async (t) => {
  await t.step({
    name: "luminance",
    fn: () => {
      const code = `
            (tone C4 2)
          `;

      run(code);

      fail(
        "This test is not implemented yet. Please implement it.",
      );
    },
    ignore: true,
  });
});
