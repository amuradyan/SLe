# Look it up

You've made it this far, and now we can play `shvi` files but the music we write in shvi still lacks ...musicality. If you look at the `fixtures/twinkle-twinkle.shvi` or `fixtures/still-dre.shvi` files, you'll see that the score is not very readable, since we don't write the notes in a musical notation, but rather as frequencies.

So far we the only atoms in Shvi were the commands, such as `tone`, `sequence`, and `parallel`, appearing only as the operands in our code, in the `evaluate`. Now we'll need to use atoms as operands as well, i.e. instead of writing the frequency of a note, we would like to write its name, such as `C4`, `D4`, or `E4` like `(tone C4 1000)`.

This means that every time we are dealing with an atom, we have to evaluate it to get its value. This is both true for the notes and the commands, the former pointing to frequencies and the latter to functions.

To implement this, we will create a lookup table called the `environment` and every time we encounter an atom, we will look it up in the environment to get its value.

There's a list lookup exercise in `exercises.test.js` that will help you warm up. Once that is done, you can go on and rewrite the `evaluate` function to handle atoms and make the `shvi.test.js` tests pass.

**NOTE** that you will have to implement a new command called `silence`, that will generate a 0 frequency tone for a given duration, e.g. `(silence 1000)`.
