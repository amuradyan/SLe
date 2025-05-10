# Following commands

In the previous steps we've learned how to make the computer play a sound and how to break a sentence into *tokens* - numbers or atoms /like `tone`/.

Now we’ll try to tie those two together and make Shvi play the sound written in our code.

First let's look at how Lisps evaluate code. A Lisp expression is just a list whose *first* item is the operator and the *rest* are its operands.

```lisp
3            ; ⇒ 3        a lone value
(+ 1 2)      ; ⇒ 3        operator = +, operands = 1 2

+ 1 2        ; not a call!    produces the literal list [<+>, 1, 2]
```

Our source code therefore *must* sit inside parentheses if we expect it to run.

Tokenization already gives us flat arrays:

```js
tokenize('(tone 293.66 1000)') // → [ [atom('tone'), 293.66, 1000] ]
```

To recognize *nesting*, we need to extend our tokenizer a bit. This time we will not only split the input into tokens, but also group them into lists. The result of tokenization will be a list of lists.

```
(+ 1 2 3) ... []
( ........... [] []
 + .......... [+] []
   1 ........ [+ 1] []
     2 ...... [+ 1 2] []
       3 .... [+ 1 2 3] []
        ) ... [[+ 1 2 3]]
```

**Algorithm sketch**

1. start with an *empty* stack of lists, [[]]
2. as you walk across the input stream, accumulate the characters into a string
3. once you hit a space, push the string into the topmost list on the stack, and reset the ongoing token accumulator string
4. On `'('` push a new list /`[]`/ onto the stack
5. On `')'` pop the topmost list and push it onto the previous one at the end
6. When the stream ends, `stack[0]` is your program

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
