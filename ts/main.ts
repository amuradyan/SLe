export function add(a: number, b: number): number {
  return a + b;
}

console.log("Add 2 + 3 =", add(2, 3));

console.log(Deno.readTextFileSync("../notes/DetailedPlan.md"));

const l: (string | number | [])[] = ["hello", 42, []];

const [first, ...rest] = l;

console.log(first);
console.log(rest);

console.log([first, ...rest]);

Symbol.for("foo") === Symbol.for("foo"); // true

console.log("asd պօպօկ пндук".split(""))