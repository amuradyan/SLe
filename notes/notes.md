# Notes

The idea is to write a language, by growing it organically, coherently, moving towards a specific product at the end, modifying mechanical parts in such a way  that each next step the least amount of those, with minimum cognitive load and implementation hassle, and moves us closer to the end result. Eeach next step should take us from one good place to another.

We'll be working with three *moving* parts:

    the tokenizer - enters early on, is modified a few times and stabilizes quickly.
    the environment - enters early on, is modified a few times and stabilizes rather soon.
    the evaluator - enters early on, is the main focus of the work, and is modified a lot.

The evaluator has to understand cartain types of expressions, so we can either introduce them in *alphabetical order*, or come up with a narrative. Certain types of expression require certain types of environment and tokenization sophistications, so we better introduce them in a way that makes sense. **Ignoring things** is also powerfull tool.

Keep in mind, that some technical trainig will be provided, roughlt in the first 4 hours /2 days/ of the course, so the magnitue of the complication should not exceed surrent skill\knowledge level by much.

From luminance go to average brightness. Calcuate average brightness with JS, just like limunance. This will take env lookup a comfortable step further.

Next try and calculate the average brightness in SLe. For that we need to be able to parse nested expressions like `(/ (* r g b))`, so do that. Note that previously we could interpret only 2 types of expressions: atoms and numbers. We were also able to interpret a third kind of an expression - the application. In our

The next logical step for environment would be to introduce bindings along with evlist.

(
    (define second (lambda (x) (first (rest x))))
    (define third (lambda (x) (second (rest x))))

    (define coordinate-of first)
    (define color-of second)

    (define red first)
    (define green second)
    (define blue third)

    (define map
        (lambda (f arguments)
            (cond ((null? arguments) (quote ()))
                  (else (list (f (first arguments)) (map f (rest arguments)))))))

    (define greyscale-pixel
        (lambda (red green blue)
            (+ (* 0.299 red) (* 0.587 green) (* 0.114 blue))))

    (define greyscale-bitmap
        (lambda (bitmap)
            (map (lambda (pixel) (
                (define pixel-coordinate (coordinate-of pixel))
                (define pixel-color (color-of pixel))

                (list pixel-coordinate
                      (greyscale-pixel (red pixel-color) (green pixel-color) (blue pixel-color)))
            )) bitmap)))

    (define greyscale
        (lambda (path)
            (define bitmap (read-bitmap path))
            (define greyscaled-bitmap (greyscale-bitmap bitmap))

            (write-bitmap greyscaled-bitmap "./greyscaled.bmp")))

    (greyscale "./nkar.bmp"))

---------------

ATM, we are playing around with color and filters, trying to greyscale a BPM for example. I am thinking we should also look into music.

    (attack 0.1)
    (decay 0.1)
    (sustain 0.5)
    (release 0.1)

    (pitch C4 0.5)

    (join
    (left (fade C4 C4 D4 C4 F4 E4))
    (right C3 C3 G3 C3 F3 C3))

    (stereo
        (harmony
            (chord C4 E4 G4)
            (chord C4 E4 G4)
            (chord C4 E4 G4)
            (chord C4 E4 G4)))
        (harmony
            (chord C4 E4 G4)
            (chord C4 E4 G4)
            (chord C4 E4 G4)
            (chord C4 E4 G4))

    (chord A4 C5 E5)
    (scale C4 0.5)
    (tone C4 0.5)
    (define pnduk tone)
    (pnduk (harmony C4 E4 G4) 8)
