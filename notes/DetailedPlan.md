# Detailed Plan

## Day 1

Introduction to JS: setup, tools /deno, VS Code, git, and GitHub/, exercises with a test-first approach to form a basic understanding of arrays, enums, files, functions /anonymous ones as well/, and recursion.

* Initialize a git repo locally with `git init`
* Fire up the VS Code, install the [deno](https://docs.deno.com/runtime/reference/vscode/) extension
* Learn about JS `export`, `function`, string-plitting and `Deno.test` and *deno*s `deno test --watch` and `deno run <file>` commands
* Write a couple of recursive functions working with arrays in *head\tail* style to get a feel for the syntax and the process. The exercises would be about tokenizing a string, and storing them in an array. We might go for parentheses as well, if time allows, and store them as a list.
* Learn about the `Deno.readTextFileSync` and the `--allow-read` flag through a simple exercise of reading and printing the contents of a file.
* Write a function that reads a file and returns the tokenized contents as an array.

* Register on GitHub, create a repo
* Connect the two together and push the days code to GitHub

        git remote add origin ...
        git push -u origin master

## Day 2

Introduction to LISPs/probably with Racket/: the infix notation and getting used to the syntax, solving simple problems to get the hang of the language, and learning the basic operations /car, cdr, eq?, lambda, cond, define, .../.

* Install Racket /should this be preinstalled?/
* install the [Magic Racket](https://marketplace.visualstudio.com/items?itemName=evzen-wybitul.magic-racket) extension for VS Code
* Learn about the `define` form, write a simple adder and run it from the command line
* Learn about the *rackunit* testing framework and the `provide`, write a simple test for the adder and run it from the command line
* Learn about the `lambda`, `cond`, `eq?`, `null?`, `car`, `cdr`, and `cons` forms, and write a few functions and tests with them
* Push the code to GitHub

## Day 3

Coding the SLIm tokenizer in JS. Reading a file and turning it into an array of tokens. If we are doing well, maybe we'll also introduce and handle multiline strings and comments.

* Assign types to tokens during tokenization: strings, numbers and atoms.
* Handle nested parentheses
* Extra: ignore line comments /lines that start with a ';'/ during tokenization

**NOTE:** Here, to avoid using classes I am leaning towards tuples of the form `[type, value]` where `type` is a string and `value` is the actual value of the token. TBD.

## Day 4

Introducing the notion of evaluation\application, starting with evaluation\application of primitive values /'true', 'false', whole numbers and strings/ and primitive operations /cons, car, cdr, null?, '+', '-', .../. The concrete primitives of SLIm will be decided during the course.

* Turn s-expressions to *actions*, the core of the `meaning` function
* Implement the `meaning` function for primitives atoms: `true`, `false`, numbers, and strings
* Implement list evaluation
* Introduce reserved words\promitives to the language: `cons`, `car`, `cdr`, `null?`, `eq?`, `+`, `-`
* Implement function application for primitives
* Extra: implement `*`, `/`, `not`, `and` and `or`. This also might be a homework exercise.

## Day 5

We continue with the evaluation of expressions by introducing the `define` form and the idea of the environment. For simplicity, we resort to a single global environment implemented as a stack data structure.

* Introduce the notion of the environment /entry -> frame -> environment/ and model it as a simple stack
* Implement the lookup function in frames and entries the environment
* Implement extension methods for frames and entries of the environment
* Introduce the `define` form into the `meaning` function. Learn that not all expressions evaluate to a value.

## Day 6

We move on to introducing evaluating non-primitive forms /'cond' and 'quote'/.

* Implement the `meaning` function for the `quote` form
* Implement the `meaning` function for the `cond` form, Learn about branching and the idea of the 'else' clause
* Extra: implement the `if` form. This also might be a homework exercise.

## Day 7

Implementation of the `lambda` form and the idea of closures.

* Introduce the notion of a closure and how functions carry their environment with them
* Turn lambda expressions into *actions*
* Extend the function application to handle lambdas
* Implement the `meaning` function for the `lambda` form

## Day 8

If all goes well, we'll spend the day with a recap of what we did, solve some katas in SLIm, and talk about ideas we were not able to cover during the course, do some refactoring and cleanup. Otherwise, we'll use the day to finish the implementation of the SLIm.
