export function add(a, b) {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log(Deno.args)
  console.log("Add 2 + 3 =", add(2, 3));
}
