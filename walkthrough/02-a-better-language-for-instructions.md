# A better language for instructions

To understand a sentence, we need to break it down to words, so that's what we are going to do now.

```lisp
tone 261.63 1000
```

Words are separated by spaces, hence, when parsing a sentence, we'll take the characters between spaces and interpret them. Some words, like `261.63` and `1000`, can be interpreted as numbers, while others, like `tone`, cannot be interpreted as anything else but a word. We'll call the latter *atoms*.

You will start with a number of failing tests in [`tokenizer.test.js`](../tokenizer.test.js) that try to tokenize a string input. The goal is to make the tests pass by implementing a simple parser.

To turn a string into an array of characters, we can use the [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), and to create atoms we can use the [`Symbol.for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for).
