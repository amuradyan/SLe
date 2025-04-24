# Workshop description

```lisp
(sequence
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone Eb3 1500) (tone G2 1500))) ; DUMMMM
```

This is Beethoven's 5th Symphony, and we'll be building a tool to be able to write this, and music in general, and play it. Along the way we'll

- learn how our programs turn into numbers or audio files
- what are the mechanics of such abilities
- how to encode the sound and how to make it pleasing to our ears
- and more.

There will be a lot of coding, so you'll sharpen your basic programming skills in javaScript.

For the looks and the mechanics of our language, we'll draw inspiration from an old and powerful family of programming languages - the *LISPs*, and we'll use JS to actually build and use the tool. We won't get into details with any of these languages, and, I hope, you'll be surprised to learn how far one can go in their experiments relying on a few fundamental ideas.

Starting from a single note, we'll then explore the ways of combining them, changing our system piece by piece, to be able to write more complex pieces. From there we might look into the repetitive nature of music or the ability to name certain passages in a piece or anything else we'll find important or interesting at the time.

----

```lisp
(sequence
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone G3 300) (tone Eb3 300))    ; da
    (parallel (tone Eb3 1500) (tone G2 1500))) ; DUMMMM
```

Սա Բեթհովենի 5-րդ սիմֆոնիան է, և մենք ստեղծելու ենք մի գործիք, որով հնարավոր կլինի գրել և նվագել այս և այլ երաժշտական գործերը։

Ընթացքում մենք կտեսնենք՝

- ինչպես են ծրագրերը դառնում թվեր կամ աուդիո ֆայլեր,
- որոնք են նման կարողություների հիմքում ընկած մեխանիզմները,
- ինչպես կարելի է կոդավորել ձայնը և դարձնել այն հաճելի ականջին և ավելին։

Գրելու ենք շատ կոդ, ուստի կսրես JavaScript-ով տարրական ծրագրավորման քո հմտությունները։

Մեր լեզվի տեսքն ու կառուցվածքը ոգեշնչված են ծրագրավորման լեզուների մի հին ու հզոր ընտանիքից՝ LISP-երից, իսկ գործիքը ստեղծելու և կիրառելու համար օգտագործելու ենք JavaScript։ Չնայած որ այս լեզուների ուսումնասիրությանը խորությամբ չենք անդրադառնա, կարծում եմ՝ կզարմանաս, թե որքան հեռու կարելի է հասնել ընդամենը մի քանի հիմնարար գաղափարի և պարզ գործիքի օգնությամբ։

Կսկսենք մեկ նոտայից, ապա կանցնենք դրանց համադրությանը՝ քայլ առ քայլ ձևափոխելով մեր գործիքը՝ ավելի բարդ ստեղծագործություններ գրելու համար։ Ապա կարող ենք անդրադառնալ երաժշտության կրկնվող բնույթին, ստեղծագործության հատվածներին անուններ տալուն կամ որևէ այլ բանի, որն այդ պահին կարևոր կամ հեատքրքիր կհամարենք։
