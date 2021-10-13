const { LazyOption, Option } = require('../lib/option');
const { describe, expect, test } = require('@jest/globals');

describe("'LazyOption' lazy counterpart of an 'Option' type", function() {

    test("should be considered an instance of 'Option' type", function() {
        const lazyOption = LazyOption.create(v => Option(v, null), 1);
        expect(lazyOption instanceof Option).toBe(true);
    });

    test("should create a lazy varian of an option and try to resolve it only when necessary", () => {
        let called = 0;
        const lazyOption = LazyOption.create(v => {
            called++;
            return Option(v, null);
        }, 1);

        expect(called).toEqual(0);

        expect(lazyOption.getOrElse(2)).toEqual(1);
        expect(called).toEqual(1);
    });

    test("should expose internal state via 'isResolved' method", function() {
        const lazyOption = LazyOption.create(v => Option(v, null), 1);

        expect(lazyOption.isResolved()).toBe(false);

        expect(lazyOption.getOrElse(2)).toEqual(1);
        expect(lazyOption.isResolved()).toBe(true);
    });

    test("should throw an Error if given callback is not a function", () => {
        const thrower = () => LazyOption.create('Foo');
        expect(thrower).toThrow(TypeError);
    });

    test("should throw an Error if given callback does not return an 'Option' instance", function() {
        const thrower = () => LazyOption.create(() => 'Foo').getOrElse('');
        expect(thrower).toThrow(TypeError);
    });

    test("should behave like an iterator, yielding resolved value", function() {
        const toSome = LazyOption.create(v => Option(v), 1);
        const toNone = LazyOption.create(v => Option(v, 1), 1);
        let counter = 0;

        for (let val of toSome) {
            expect(val).toEqual(toSome.get());
            counter++;
        }

        expect(counter).toEqual(1);

        for (let val of toNone) {
            expect(val).toBeUndefined();
            counter++;
        }

        expect(counter).toEqual(1);
    });
});
