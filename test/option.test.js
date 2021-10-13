const { Option, Some, None } = require("../lib/option");
const { describe, expect, test } = require('@jest/globals');

describe("'Option' monad", function() {

    test("should throw Error when used as a constructor", function() {
        let thrower = () => new Option("value");

        expect(thrower).toThrow(Error);
    });

    test("should return instance of self as a result of call", function() {
        let someOpt = Option(1);
        let noneOpt = Option(null);

        expect(someOpt).toBeInstanceOf(Option);
        expect(noneOpt).toBeInstanceOf(Option);
    });

    test("should return Some(value) if value has been given on call", function() {
        let someOpt = Option("value");
        expect(someOpt).toBeInstanceOf(Some);
    });

    test("should return None() if NO value has been given on call", function() {
        let noneOpt = Option();
        expect(noneOpt).toBeInstanceOf(None);
    });

    test("should return None() if value value given on call matches the value of 'noneValue' parameter", function() {
        let noneOpt = Option(1, 1);
        expect(noneOpt).toBeInstanceOf(None);
    });

    describe("#fromReturn() static method", function() {
        test("should return instance of Option when called properly", function() {
            let func = (a, b) => a + b,
                opt  = Option.fromReturn(func, "foo", "bar");

            expect(opt).toBeInstanceOf(Option);
        });

        test("should throw TypeError when the first argument passed is not a function", function() {
            let thrower = () => {
                Option.fromReturn("not-a-function", "foo", "bar");
            };
            expect(thrower).toThrow(TypeError);
        });
    });

    describe("#ensure() static method", function() {
        test("should return the same instance of Option when Option was given", function() {
            let opt = Option(1),
                res = Option.ensure(opt);

            expect(res).toBeInstanceOf(Option);
            expect(Object.is(opt, res)).toBe(true);
        });

        test("should return instance of Option wrapping the value when value of any other type was given", function() {
            let value  = "value",
                result = Option.ensure(value);

            expect(result).toBeInstanceOf(Option);
            expect(result.get()).toEqual(value);
        });
    });
});
