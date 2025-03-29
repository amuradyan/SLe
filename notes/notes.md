# Notes

The idea is to write a language, by growing it organically, coherently, moving towards a specific product at the end, adding mechanical parts in such a way  that each next step adds the least amount of cognitive load and implementation hassle and moves us closer to the end result. Given we'll be working with `tokens`, `env` and the `evaluator`, try to come up with a reasonable step that complicates the smallest group of the three.

Keep in mind, that some technical trainig will be provided, roughlt in the first 4 hours /2 days/ of the course, so the magnitue of the complication should not exceed surrent skill\knowledge level by much.

From luminance go to average brightness. Calcuate average brightness with JS, just like limunance. This will take env lookup a comfortable step further.

Next try and calculate the average brightness in SLe. For that we need to be able to parse nested expressions like `(/ (* r g b))`, so do that. Note that previously we could interpret only 2 types of expressions: atoms and numbers. We were also able to interpret a third kind of an expression - the application. In our

The next logical step for environment would be to introduce bindings along with evlist.
