#lang racket/base

(define (add a b)
  (+ a b))

(define add-five
  (lambda (x)
    (add x 5)))

(provide add add-five)