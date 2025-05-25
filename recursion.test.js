import { assertEquals } from "jsr:@std/assert";

Deno.test("Recursion", async (t) => {
  await t.step({
    name: "find the nth Fibonacci number",
    fn: () => {
      // If n is 0, return 0
      // If n is 1, return 1
      // Otherwise, return the sum of the previous two Fibonacci numbers

      const fibonacci = (n) => {
        if (n === 0) {
          return 0;
        }
        if (n === 1) {
          return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
      };

      const generalResult = fibonacci(5);
      const zeroResult = fibonacci(0);
      const oneResult = fibonacci(1);
      assertEquals(generalResult, 5);
      assertEquals(zeroResult, 0);
      assertEquals(oneResult, 1);
    },
  });

  await t.step({
    name: "reverse capitalize a string",
    fn: () => {
      // If the string is empty, return an empty string
      // If the first character is uppercase
      //  make it lowercase and add it to the result
      // If the first character is lowercase
      //  make it uppercase and add it to the result
      // Move to the next character and repeat the process
      // When all the characters are checked, return the result

      const reverseCapitalize = (str) => {
        const loop = (str, acc) => {
          if (str.length === 0) {
            return acc;
          }
          const [first, ...rest] = str;

          const newChar = first === first.toUpperCase()
            ? first.toLowerCase()
            : first.toUpperCase();
          const newAcc = acc + newChar;
          return loop(rest, newAcc);
        };

        return loop(str, "");
      };

      const generalResult = reverseCapitalize("BetTeR SafE ThaN SoRry");
      const emptyStringResult = reverseCapitalize("");
      assertEquals(generalResult, "bETtEr sAFe tHAn sOrRY");
      assertEquals(emptyStringResult, "");
    },
  });

  await t.step({
    name: "find the maximum value in a list",
    fn: () => {
      // If the list is empty, return -Infinity
      // Assume the first element in the list is the maximum
      //  and compare it with the rest of the elements
      // Once the current max is smaller than the next element, replace it with the latter
      // When all the elements are checked, return the maximum value

      const max = (numbers) => {
        if (numbers.length === 0) {
          return -Infinity;
        }
        const loop = (numbers, currentMax) => {
          if (numbers.length === 0) {
            return currentMax;
          }
          const [first, ...rest] = numbers;
          const newMax = first > currentMax ? first : currentMax;
          return loop(rest, newMax);
        };
        return loop(numbers.slice(1), numbers[0]);
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
      // If the substring or the string are empty, return the string
      // Move through the characters two by two
      // If the first character is not the first character of the substring
      //  Add it to the result and move to the next character of the string
      // If the first character is the first character of the substring
      //  Check if the next character is the second character of the substring
      //  If it is, skip both characters
      //  If it is not, add the first character to the result and move to the next character of the string

      const strip = (str, substr) => {
        if (str.length === 0 || substr.length === 0) {
          return str;
        }

        const loop = (str, acc) => {
          if (str.length === 0) {
            return acc;
          }

          if (str.startsWith(substr)) {
            return loop(str.slice(substr.length), acc);
          } else {
            return loop(str.slice(1), acc + str[0]);
          }
        };
        return loop(str, "");
      };

      const generalResult = strip("Skies are grey in Greece", "re");
      const emptyStringResult = strip("", "re");
      const emptySubstringResult = strip("Skies are grey in Greece", "");
      assertEquals(generalResult, "Skies a gy in Gece");
      assertEquals(emptySubstringResult, "Skies are grey in Greece");
      assertEquals(emptyStringResult, "");
    },
  });

  await t.step({
    name: "flatten a nested array",
    fn: () => {
      // If the array is empty, return an empty array
      // If the first element is an array, flatten it and add it to the result
      // If the first element is not an array, add it to the result
      // Move to the next element and repeat the process

      const flatten = (arr) => {
        if (arr.length === 0) {
          return [];
        }
        const loop = (arr, acc) => {
          if (arr.length === 0) {
            return acc;
          }
          const [first, ...rest] = arr;

          if (Array.isArray(first)) {
            return loop(first.concat(rest), acc);
          } else {
            return loop(rest, acc.concat(first));
          }
        };
        return loop(arr, []);
      };

      const generalResult = flatten([1, [2, 3], [4, [5]]]);
      const emptyArrayResult = flatten([]);
      assertEquals(generalResult, [1, 2, 3, 4, 5]);
      assertEquals(emptyArrayResult, []);
    },
  });
});
