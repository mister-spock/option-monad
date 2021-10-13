const { Option, None } = require("../lib/option");
const { describe, expect, test } = require('@jest/globals');

describe("'None' variant of an 'Option' monad", function() {

    describe("#create() static method", function() {
        test("should return instance of self that is also an instance of Option", function() {
            let noneOpt = None.create();
            expect(noneOpt).toBeInstanceOf(None);
            expect(noneOpt).toBeInstanceOf(Option);
        });
    });

    describe("#isDefined() method", function() {
        test("should return 'false'", function() {
            let noneOpt = Option(null);
            expect(noneOpt.isDefined()).toBe(false);
        });
    });

    describe("#isEmpty() method", function() {
        test("should return 'true'", function() {
            let noneOpt = Option(null);
            expect(noneOpt.isEmpty()).toBe(true);
        });
    });

    describe("#get() method", function() {
        test("should throw error when called", function() {
            let noneOpt = Option(null);
            expect(() => { noneOpt.get(); }).toThrow(Error);
        });
    });

    describe("#getOrElse() method", function() {
        test("should return value passed to the method", function() {
            let expected = 1,
                result   = Option(null).getOrElse(expected);

            expect(result).toEqual(expected);
        });
    });

    describe("#getOrCall() method", function() {
        test("should return value that a function passed to the method returns", function() {
            let expected = 1,
                result   = Option(null).getOrCall(() => expected);

            expect(result).toEqual(expected);
        });

        test("should throw TypeError if the argument passed to the method is not a function", function() {
            let thrower = () => Option(null).getOrCall("not a function");

            expect(thrower).toThrow(TypeError);
        });
    });

    describe("#getOrThrow() method", function() {
        test("should throw error that has been passed to the method", function() {
            let thrower = () => Option(null).getOrThrow(new Error("error message"));

            expect(thrower).toThrow("error message");
        });

        test("should throw TypeError if argument passed to the method is not an instance of an 'Error'", function() {
            let thrower = () => Option(null).getOrThrow("not an error");

            expect(thrower).toThrow(TypeError);
        });
    });

    describe("#orElse() method", function() {
        test("should return the instance of an Option that has been passed to the method", function() {
            let expected = Option(1),
                result   = Option(null).orElse(expected);

            expect(result).toEqual(expected);
        });

        test("should throw an TypeError if argument passed to the method is not an instance if Option", function() {
            let thrower = () => Option(null).orElse("not an option");

            expect(thrower).toThrow(TypeError);
        });
    });

    describe("#forAll() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.forAll(() => "some func");
            expect(Object.is(result, noneOpt)).toBe(true);
        });
    });

    describe("#map() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.map(() => "some func");
            expect(Object.is(result, noneOpt));
        });
    });

    describe("#flatMap() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.flatMap(() => "some func");
            expect(Object.is(result, noneOpt));
        });
    });

    describe("#filter() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.filter(() => true);
            expect(Object.is(result, noneOpt));
        });
    });

    describe("#filterNot() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.filterNot(() => true);
            expect(Object.is(result, noneOpt));
        });
    });

    describe("#select() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.select("some value");
            expect(Object.is(result, noneOpt));
        });
    });

    describe("#reject() method", function() {
        test("should return itself", function() {
            let noneOpt = Option(null);
            let result  = noneOpt.reject("some value");
            expect(Object.is(result, noneOpt));
        });
    });

    describe("#foldLeft() method", function() {
        test("should return itself", function() {
            let noneOpt    = Option(null),
                initialVal = 1;

            expect(noneOpt.foldLeft(initialVal)).toEqual(initialVal);
        });
    });

    describe("#foldRight() method", function() {
        test("should return itself", function() {
            let noneOpt    = Option(null),
                initialVal = 1;

            expect(noneOpt.foldRight(initialVal)).toEqual(initialVal);
        });
    });

    describe("#toString() method", function() {
        test("should return correct value when called", function() {
            let noneOpt = Option(null);
            expect(noneOpt.toString()).toEqual("None()");
        });
    });

    test("should behave like an empty iterator", function() {
        let noneOpt = Option(null);

        for (let val of noneOpt) {
            expect(val).toBeUndefined();
        }
    });
});
