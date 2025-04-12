export function add(a: number, b: number): number {
  return a + b;
}

log.debug("Add 2 + 3 =", add(2, 3));

log.debug(Deno.readTextFileSync("../notes/DetailedPlan.md"));

const l: (string | number | [])[] = ["hello", 42, []];

const [first, ...rest] = l;

log.debug(first);
log.debug(rest);

log.debug([first, ...rest]);

Symbol.for("foo") === Symbol.for("foo"); // true

log.debug("asd պօպօկ пндук".split(""));
