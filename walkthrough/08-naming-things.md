# Naming things

So far so good. We have a working interpreter that can play music from a file. However, the code we write in Shvi is still a but hard to read. See the example below:

```lisp
(repeat 3
  (sequence
    (repeat 8
      (sequence
        (tone 261.63 80) (tone 329.63 130) (tone 440.00 360)))

    (repeat 3
      (sequence
        (tone 246.94 80) (tone 329.63 130) (tone 440.00 360)))

    (repeat 5
      (sequence
        (tone 246.94 80) (tone 329.63 130) (tone 392.00 360)))))
````

Even though the code above will play the "Still D.R.E." melody, it's a bit hard for our eye to catch the phrases and passages. To make it more readable, we can use names for its' parts. Compare the code above with the one below:

```lisp
(define first-phrase
  (sequence
    (tone C4 80) (tone E4 130) (tone A4 360)))

(define second-phrase
  (sequence
    (tone B3 80) (tone E4 130) (tone A4 360)))

(define third-phrase
  (sequence
    (tone B3 80) (tone E4 130) (tone G4 360)))

(define the-beat
  (sequence
      (repeat 8 first-phrase)
      (repeat 3 second-phrase)
      (repeat 5 third-phrase)))

(define thrice 3)

(repeat thrice the-beat)
```

This is much more readable, and we can easily see the structure of the melody. To achieve this, we will introduce a new command called `define`, which will allow us to define a name for a piece of code.

To do this, we have to check if we're evaluating a special form of an application, which starts with the `define`, and, if so, we will add the name and the value to the environment. The `define` command will take two arguments: the name and the value, e.g.

`(define first-phrase (sequence (tone C4 80) (tone E4 130) (tone A4 360)))`.
