import { assertEquals } from "jsr:@std/assert";

Deno.test("Recursion", async (t) => {
  await t.step({
    name: "reverse capitalize a string",
    fn: () => {
      const reverseCapitalize = (str) => {
        const loop = (str, acc) => {
          throw new Error("Not implemented");
        };

        return loop(str, "");
      };

      const result = reverseCapitalize("BetTeR SafE ThaN SoRry");
      assertEquals(result, "bETtEr sAFe tHaN sOrrY");
    },
  });

  await t.step({
    name: "find the maximum value in a list",
    fn: () => {
      const max = (numbers) => {
        const loop = (numbers, maxValue) => {
          throw new Error("Not implemented");
        };

        return loop(numbers, -Infinity);
      };

      const maxOfEmptyList = max([]);
      const maxOfSingletonList = max([2]);
      const maxOfList = max([2, 3, 1, 4]);

      assertEquals(maxOfEmptyList, -Infinity);
      assertEquals(maxOfSingletonList, 2);
      assertEquals(maxOfList, 4);
    },
  });

  await t.step({
    name: "remove substrings from a string",
    fn: () => {
      const strip = (str, substr) => {
        throw new Error("Not implemented");
      };

      const result = strip("Skies are grey in Greece", "re");
      assertEquals(result, "Skies a gy in Gece");
    },
  });
});
