import { assertEquals } from "jsr:@std/assert";

Deno.test("Recursion", async (t) => {
  await t.step({
    name: "Does the bus serve the line?",
    fn: () => {
      // below is the list of lines and buses that serve them
      // the first element of the array is the line number
      // the second element is an array of bus numbers that serve the line
      // if the bus serves the line, return true
      // if the bus does not serve the line, return false
      // if the line does not exist, return false

      const linesAndBuses = [
        [1, [11, 22, 33]],
        [3, [44, 55, 66]],
        [5, [11, 55, 77]],
        [7, [11, 44, 33]],
        [9, [44, 55, 66]],
        [17, [11, 66, 77]],
      ];

      const busServesLine = (line, bus) => {
        const lineData = linesAndBuses.find(([lineNumber]) =>
          lineNumber === line
        );
        if (!lineData) return false;
        const [, buses] = lineData;
        return buses.includes(bus);
      };

      const generalResult = busServesLine(5, 77);
      const nonExistentLineResult = busServesLine(100, 11);
      const nonExistentBusResult = busServesLine(1, 100);
      const nonExistentLineAndBusResult = busServesLine(100, 100);
      assertEquals(generalResult, true);
      assertEquals(nonExistentLineResult, false);
      assertEquals(nonExistentBusResult, false);
      assertEquals(nonExistentLineAndBusResult, false);
    },
  });
  await t.step({
    name: "Is a string a palindrome?",
    fn: () => {
      // A palindrome is a word, phrase, number, or other sequence of characters
      // that reads the same forward and backward (ignoring spaces, punctuation,
      // and capitalization).
      // If the string is empty, return true
      // If the first and last characters are equal, check the rest of the string
      // If the first and last characters are not equal, return false

      const isPalindrome = (str) => {
        const cleanStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const checkPalindrome = (start, end) => {
          if (start >= end) return true;
          if (cleanStr[start] !== cleanStr[end]) return false;
          return checkPalindrome(start + 1, end - 1);
        };
        return checkPalindrome(0, cleanStr.length - 1);
      };

      const generalResult = isPalindrome("racecar");
      const emptyStringResult = isPalindrome("");
      const nonPalindromeResult = isPalindrome("hello");
      assertEquals(generalResult, true);
      assertEquals(emptyStringResult, true);
      assertEquals(nonPalindromeResult, false);
    },
  });
  // find the longest repeating character in a string
  await t.step({
    name: "Find the longest repeating substring",
    fn: () => {
      // If the string is empty, return an empty string
      // If the first character is the first character of the substring
      // You might want to keep track of the longest chain overall and the current chain
      // Once the current chain is over, check if it is longer than the longest chain and replace if so

      const longestRepeatingCharacterChain = (str) => {
        if (str.length === 0) return "";

        const findLongestChain = (
          remaining,
          currentChar,
          currentCount,
          maxChar,
          maxCount,
        ) => {
          if (remaining.length === 0) {
            return currentCount > maxCount
              ? { char: currentChar, count: currentCount }
              : { char: maxChar, count: maxCount };
          }

          const [head, ...tail] = remaining;

          if (head === currentChar) {
            return findLongestChain(
              tail,
              currentChar,
              currentCount + 1,
              maxChar,
              maxCount,
            );
          } else {
            const newMax = currentCount > maxCount
              ? { char: currentChar, count: currentCount }
              : { char: maxChar, count: maxCount };
            return findLongestChain(tail, head, 1, newMax.char, newMax.count);
          }
        };

        const result = findLongestChain(str.slice(1), str[0], 1, str[0], 1);
        return result.char.repeat(result.count);
      };

      const generalResult = longestRepeatingCharacterChain("222aabbbbcc");
      const emptyStringResult = longestRepeatingCharacterChain("");
      const nonRepeatingResult = longestRepeatingCharacterChain("abc");
      assertEquals(generalResult, "bbbb");

      assertEquals(emptyStringResult, "");
      assertEquals(nonRepeatingResult, "a");
    },
  });
  await t.step({
    name: "How high?",
    fn: () => {
      const buildingsAndHeights = [
        ["Empire State Building", 443],
        ["Burj Khalifa", 828],
        ["Shanghai Tower", 632],
        ["One World Trade Center", 541],
        ["Taipei 101", 508],
      ];

      const howHigh = (building) => {
        throw new Error("Implement me!");
      };

      const generalResult = howHigh("Burj Khalifa");
      const nonExistentBuildingResult = howHigh("Hanoi Tower");
      const emptyBuildingResult = howHigh("");
      assertEquals(generalResult, 828);
      assertEquals(nonExistentBuildingResult, -1);
      assertEquals(emptyBuildingResult, -1);
    },
  });
});
