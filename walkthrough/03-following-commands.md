# Following commands

In the previous steps we've learned how to make the computer play a sound and how to break a sentence into *tokens* - numbers or atoms /like `tone`/.

Now we’ll try to tie those two together and make Shvi play the sound written in our code.

This will require a solid amount of coding, so before we get to it we need to warm up.

In the `recursion.test.js` you will find a number of exercises that will help you get familiar with recursion. A `loop` function that replaces the four and calls itself, if needed, for another iteration. While recursing over lists, we'll notice a pattern: operate on the first element of the list, then call the function on the rest of it, aka head-tail recursion. Once we are done with the recursion exercises, we will move on to the tasks that will allow us to make a sound with code.

First let's look at what Lisp code looks like and how it is evaluated. Below is the formula we know for generating the sound sine wave:

```lisp
(* amplitude (sin (* 2 pi frequency (/ n sample-rate))))
```

A Lisp expression is just a list whose *first* item is the operator and the *rest* are its operands. This style of writing code is called *prefix notation*, whereas JS uses *infix notation*. To apply an operator to its operands, we need to surround the whole expression with parentheses.

```lisp
3            ; ⇒ 3        a lone value
(+ 1 2)      ; ⇒ 3        operator = +, operands = 1 2

+ 1 2        ; not a call!    produces the literal list [<+>, 1, 2]
```

Our source code therefore *must* sit inside parentheses if we expect it to run. It is not a coincidence that lists in Lisps are also written in the same way. When tokenizing Lisps, each application lives in a list of its own.

```lisp
'(Alpha Bravo Charlie Delta) ; ⇒ produces a list (Alpha Bravo Charlie Delta)
```

We can already tokenize a flat sequence of words, now let's try the **nested** ones.

```js
tokenize('(tone 293.66 1000)') // → [ [atom('tone'), 293.66, 1000] ]
```

To handle depth, we need to extend our tokenizer a bit. This time we will not only split the input into tokens, but also group them into lists. The result of tokenization will be a list of lists.

**Algorithm sketch**

* Start with an *empty* stack of lists, [[]]
* As you walk across the input stream, accumulate the characters into a string
* Once you hit a space, push the string into the topmost list on the stack, and reset the ongoing token accumulator string
* On `'('` push a new list /`[]`/ onto the stack
* On `')'` pop the topmost list and push it onto the previous one at the end
* When the stream ends, `stack[0]` is your program

```
( + 1 2 3 ) ... []
' ' ' ' ' '
( |.|.|.|.|.... [] []
  + |.|.|.|.... [+] []
    1 |.|.|.... [+ 1] []
      2 |.|.... [+ 1 2] []
        3 |.... [+ 1 2 3] []
          ) ... [[+ 1 2 3]]
```

You'll find the tokenizer blueprint containing a `loop` function inside it this time. You'll notice that implementing the tokenizer using recursion, will mirror the nesting stack conveniently and we'll get a nice readable code.

Once we are able to tokenize our input into a list of lists, we can start evaluating it.

To `evaluate` a list:

* Take the *first* element, i.e. the operator
* Evaluate each operand
* Apply the operator to those operands

That’s it—Shvi is now executing commands!

To start we'll warm up with some recursion exercises. Fire up the deno tests like so and start coding:

```bash
deno test --watch --allow-all recursion.test.js
```

Once that's done, you can run the tests in the `tokenizer.test.js` file and move on to the tokenizer implementation:

```bash
deno test --watch --allow-all tokenizer.test.js
```

After that, you can run the tests in the `evaluator.test.js` file and move on to the evaluator implementation:

```bash
deno test --watch --allow-all evaluator.test.js
```

Once your all the tests are passing, you can move on to the next step.
