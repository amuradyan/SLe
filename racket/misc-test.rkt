#lang racket/base

(require
  rackunit
  rackunit/text-ui
  "misc.rkt")

(define misc-tests
  (test-suite "misc.rkt"
    (check-equal? (add 18 2) 20 "add 18 2 should be 20")
    (check-equal? (add-five 10) 15 "add-five 10 should be 15")))

(run-tests misc-tests)