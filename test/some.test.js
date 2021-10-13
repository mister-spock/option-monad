const { Option, Some, None } = require("../lib/option");
const { describe, expect, test } = require('@jest/globals');

describe("'Some' variant of an 'Option' monad", function() {

    describe("#create() static method", function() {
        test("should return instance of self that is also an instance of Option", function() {
            let someOpt = Some.create(1);
            expect(someOpt).toBeInstanceOf(Some);
            expect(someOpt).toBeInstanceOf(Option);
        });

        test("should throw an error if no value has been given on call", function() {
            let thrower = () => Some.create();
            expect(thrower).toThrow(Error);
        });
    });

    describe("#isDefined() method", function() {
        test("should return 'true'", function() {
            let someOpt = Option(1);
            expect(someOpt.isDefined()).toBe(true);
        });
    });

    describe("#isEmpty() method", function() {
        test("should return 'false'", function() {
            let someOpt = Option(1);
            expect(someOpt.isEmpty()).toBe(false);
        });
    });

    describe("#getOrElse() method", function() {
        test("should return stored value", function() {
            let someOpt = Option(1);
            expect(someOpt.getOrElse(null)).toEqual(1);
        });
    });

    describe("#getOrCall() method", function() {
        test("should return stored value", function() {
            let someOpt = Option(1);
            expect(someOpt.getOrCall(() => "some function")).toEqual(1);
        });
    });

    describe("#getOrThrow() method", function() {
        test("should return stored value", function() {
            let someOpt = Option(1);
            expect(someOpt.getOrThrow(new Error("some error"))).toEqual(1);
        });
    });

    describe("#orElse() method", function() {
        test("should return stored value wrapped in an option", function() {
            let someOpt = Option(1);
            let result  = someOpt.orElse(new Some(1));
            expect(Object.is(result, someOpt));
        });
    });

    describe("#forAll() method", function() {
        test("should accept a function and call it on inner value", function() {
            Option("new value").forAll(val => {
                expect(val).toEqual("new value");
            });
        });

        test("should not mutate inner value", function() {
            let someOpt = Option("some value");

            someOpt.forAll(val => val + val);

            expect(someOpt.get()).toEqual("some value");
        });

        test("should throw TypeError when the argument supplied is not a Function", function() {
            expect(() => Option(1).forAll("not a func!")).toThrow(TypeError);
        });
    });

    describe("#map() method", function() {
        test("should accept a function and call it on inner value", function() {
            Option("some value").map((val) => {
                expect(val).toEqual("some value");
                return val;
            });
        });

        test("should return function's return value wrapped into Some", function() {
            let someOpt = Option(1);
            expect(someOpt.map(val => val * 2).get()).toEqual(2);
        });

        test("should not mutate inner value of the original instance", function() {
            let someOpt   = Option(1),
                mappedOpt = someOpt.map(val => val * 2);

            expect(someOpt.get()).toEqual(1);
            expect(mappedOpt.get()).toEqual(2);
        });

        test("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).map("not a func!")).toThrow(TypeError);
        });
    });

    describe("#flatMap() method", function() {
        test("should accept a function and call it on inner value", function() {
            Option("some value").flatMap((val) => {
                expect(val).toEqual("some value");
                return Option(val);
            });
        });

        test("should return function's return value wrapped into Some", function() {
            let someOpt = Option(1);
            expect(someOpt.flatMap(val => Option(val * 2)).get()).toEqual(2);
        });

        test("should not mutate inner value of the original instance", function() {
            let someOpt   = Option(1),
                mappedOpt = someOpt.flatMap(val => Option(val * 2));

            expect(someOpt.get()).toEqual(1);
            expect(mappedOpt.get()).toEqual(2);
        });

        test("should throw Error if the argumnet function's return value is not an Option instance", function() {
            let someOpt = Option(1);

            expect(() => someOpt.flatMap(val => val * 2)).toThrow(Error);
        });

        test("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).flatMap("not a func!")).toThrow(TypeError);
        });
    });

    describe("#filter() method", function() {
        test("should return Some if filtering function returns 'true'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filter(val => val === 1);

            expect(filtered).toBeInstanceOf(Some);
            expect(filtered.get()).toEqual(1);
        });

        test("should return None if filtering function returns 'false'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filter(val => val !== 1);

            expect(filtered).toBeInstanceOf(None);
        });

        test("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).filter("not a func!")).toThrow(TypeError);
        });
    });

    describe("#filterNot() method", function() {
        test("should return Some if filtering function returns 'false'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filterNot(val => val !== 1);

            expect(filtered).toBeInstanceOf(Some);
            expect(filtered.get()).toEqual(1);
        });

        test("should return None if filtering function returns 'true'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filterNot(val => val === 1);

            expect(filtered).toBeInstanceOf(None);
        });

        test("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).filterNot("not a func!")).toThrow(TypeError);
        });
    });

    describe("#select() method", function() {
        test("should return Some if the argument is equal to inner value", function() {
            let someOpt  = Option("value"),
                selected = someOpt.select("value");

            expect(selected).toBeInstanceOf(Some);
            expect(selected.get()).toEqual("value");
        });

        test("should return None if the argument is not equal to inner value", function() {
            let someOpt  = Option("value"),
                selected = someOpt.select("value1");

            expect(selected).toBeInstanceOf(None);
        });
    });

    describe("#reject() method", function() {
        test("should return Some if the argument is not equal to inner value", function() {
            let someOpt  = Option("value"),
                rejected = someOpt.reject("value1");

            expect(rejected).toBeInstanceOf(Some);
            expect(rejected.get()).toEqual("value");
        });

        test("should return None if the argument is equal to inner value", function() {
            let someOpt  = Option("value"),
                rejected = someOpt.reject("value");

            expect(rejected).toBeInstanceOf(None);
        });
    });

    describe("#foldLeft() method", function() {
        test([
            "should accept initial value and folding function",
            "and return the result of applying a function on initial value",
            "and inner value of the Option"
        ].join(' '), function() {
            let someOpt = Option(1),
                result  = someOpt.foldLeft(10, (initial, inner) => initial + inner);

            expect(result).toEqual(11);
        });

        test([
            "folding function first argument has to be an initial value of the method call,",
            "and the second argument has to be the inner value of the Option"
        ].join(' '), function() {
            let someOpt     = Option(1),
                initialVal  = 10,
                foldingFunc = (initial, inner) => {
                    expect(initial).toEqual(initialVal);
                    expect(inner).toEqual(1);
                    return initial + inner;
                };

            someOpt.foldLeft(initialVal, foldingFunc);
        });

        test("should throw TypeError if the second argument of the method is not a folding function", function() {
            expect(() => Option(1).foldLeft(1, "not a func!")).toThrow(TypeError);
        });
    });

    describe("#foldRight() method", function() {
        test([
            "should accept initial value and folding function",
            "and return the result of applying a function on initial value",
            "and inner value of the Option"
        ].join(' '), function() {
            let someOpt = Option(1),
                result  = someOpt.foldRight(10, (inner, initial) => inner + initial);

            expect(result).toEqual(11);
        });

        test([
            "folding function first argument has to be the inner value of the Option,",
            "and the second argument has to be the initial value of the method call"
        ].join(' '), function() {
            let someOpt     = Option(1),
                initialVal  = 10,
                foldingFunc = (inner, initial) => {
                    expect(initial).toEqual(initialVal);
                    expect(inner).toEqual(1);
                    return inner + initial;
                };

            someOpt.foldRight(initialVal, foldingFunc);
        });

        test("should throw TypeError if the second argument of the method is not a folding function", function() {
            expect(() => Option(1).foldRight(1, "not a func!")).toThrow(TypeError);
        });
    });

    describe("#toString() method", function() {
        test("should return correct value when called", function() {
            let someOpt = Option(1);
            expect(someOpt.toString()).toEqual("Some(1)");
        });
    });

    test("should behave like an iterator, yielding stored value", function() {
        let someOpt = Option(1),
            counter = 0;

        for (let val of someOpt) {
            expect(val).toEqual(someOpt.get());
            counter++;
        }

        expect(counter).toEqual(1);
    });
});
