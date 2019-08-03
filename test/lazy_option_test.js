const { expect } = require('chai');
const { LazyOption, Option } = require('../lib/option');

describe("'LazyOption' lazy counterpart of an 'Option' type", function() {

    it("should be considered an instance of 'Option' type", function() {
        const lazyOption = LazyOption.create(v => Option(v, null), 1);
        expect(lazyOption instanceof Option).to.be.true;
    });

    it("should create a lazy varian of an option and try to resolve it only when necessary", () => {
        let called = 0;
        const lazyOption = LazyOption.create(v => {
            called++;
            return Option(v, null);
        }, 1);

        expect(called).to.be.equal(0);

        expect(lazyOption.getOrElse(2)).to.be.equal(1);
        expect(called).to.be.equal(1);
    });

    it("should expose internal state via 'isResolved' method", function() {
        const lazyOption = LazyOption.create(v => Option(v, null), 1);

        expect(lazyOption.isResolved()).to.be.false;

        expect(lazyOption.getOrElse(2)).to.be.equal(1);
        expect(lazyOption.isResolved()).to.be.true;
    });

    it("should throw an Error if given callback is not a function", () => {
        const thrower = () => LazyOption.create('Foo');
        expect(thrower).to.throw(TypeError);
    });

    it("should throw an Error if given callback does not return an 'Option' instance", function() {
        const thrower = () => LazyOption.create(() => 'Foo').getOrElse('');
        expect(thrower).to.throw(TypeError);
    });

    it("should behave like an iterator, yielding resolved value", function() {
        const toSome = LazyOption.create(v => Option(v), 1);
        const toNone = LazyOption.create(v => Option(v, 1), 1);
        let counter = 0;

        for (let val of toSome) {
            expect(val).to.be.deep.equal(toSome.get());
            counter++;
        }

        expect(counter).to.be.equal(1);

        for (let val of toNone) {
            expect(val).to.be.undefined;
            counter++;
        }

        expect(counter).to.be.equal(1);
    });
});
