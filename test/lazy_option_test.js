const {expect} = require("chai");
const LazyOption = require("../src/LazyOption");
const {Option, None, Some} = require("../src/Option");

let someOpt = null,
    noneOpt = null;

describe("'LazyOption' monad", function() {

    it("should create instances if LazyOption when called with 'new' independent of what first argument was supplied", function() {
        let lazyOpt  = new LazyOption(() => "I evaluated!", null),
            readyOpt = new LazyOption(1, null);

        expect(lazyOpt.get()).to.be.deep.equal("I evaluated!");
        expect(readyOpt.get()).to.be.deep.equal(1);

        expect(lazyOpt).to.be.instanceof(LazyOption);
        expect(readyOpt).to.be.instanceof(LazyOption);
    });

    it("should lazily evaluate a value that was given to it on creation", function() {
        let wasEvaluated = false,
            lazyOpt      = new LazyOption(() => {
                wasEvaluated = true;
                return "A value!";
            }, null);

        expect(lazyOpt).to.be.instanceof(LazyOption);
        expect(wasEvaluated).to.be.false;

        let result = lazyOpt.map(val => {
            return val
                .split(' ')
                .map(chunk => chunk.toUpperCase())
                .join(' ');
        });

        expect(wasEvaluated).to.be.true;
        expect(result.get()).to.be.deep.equal("A VALUE!");
    });

    it("should respect nullValue that is given to it on evaluation", function() {
        let mapCalled    = false,
            filterCalled = false,
            lazyOpt      = new LazyOption(() => "value", "value");

        let result = lazyOpt
            .filter(val => {
                filterCalled = true;
                return true;
            })
            .map(val => {
                mapCalled = true;
                return val;
            });

        expect(filterCalled).to.be.false;
        expect(mapCalled).to.be.false;
        expect(result).to.be.instanceof(None);
    });

    it("should accept any number of parameters for the lazily evaluated function parameter", function() {
        let lazyOpt = new LazyOption((a, b, c) => a * b * c, null, 20, 2, 3),
            result  = lazyOpt
                .filter(val => val === 120)
                .map(val => val / 2);

        expect(result).to.be.instanceof(Some);
        expect(result.get()).to.be.deep.equal(60);
    });

    it("should accept any kind of bound function as the lazily evaluated function parameter", function() {
        let boundFunc = function(a, b, c) {
                return [c, a, b]
                    .map(str => str.toUpperCase())
                    .join(' ');
            }.bind(null, "not", "lazy", "I am"),
            lazyOpt = new LazyOption(boundFunc, "");

        expect(lazyOpt.get()).to.be.deep.equal("I AM NOT LAZY");
    });

    it("should reflect the state of the lazy function evaluation", function() {
        let lazyOpt = new LazyOption(() => 1, null);

        expect(lazyOpt.isEvaluated).to.be.false;
        lazyOpt.get();
        expect(lazyOpt.isEvaluated).to.be.true;
    });

    it("should maintain it's type when query methods are used", function() {
        let lazyOpt   = new LazyOption(() => 1, null),
            isDefined = lazyOpt.isDefined(),
            isEmpty   = lazyOpt.isEmpty();

        expect(isDefined).to.be.true;
        expect(isEmpty).to.be.false;
        expect(lazyOpt).to.be.instanceof(LazyOption);
    });

    describe("should return an instance of 'Some' or 'None' as a result of any kind of transformation", function() {
        beforeEach(function() {
            someOpt = new LazyOption(() => 10, null),
            noneOpt = new LazyOption(() => 10, 10);
        });

        it("#map", function() {
            expect(someOpt).to.be.instanceof(LazyOption);
            expect(noneOpt).to.be.instanceof(LazyOption);

            let someRes = someOpt.map(val => val),
                noneRes = noneOpt.map(val => val);

            expect(someRes).to.be.instanceof(Some);
            expect(noneRes).to.be.instanceof(None);
        });

        it("#flatMap", function() {
            expect(someOpt).to.be.instanceof(LazyOption);
            expect(noneOpt).to.be.instanceof(LazyOption);

            let someRes = someOpt.flatMap(val => Option(val)),
                noneRes = noneOpt.flatMap(val => Option(val));

            expect(someRes).to.be.instanceof(Some);
            expect(noneRes).to.be.instanceof(None);
        });

        it("#filter", function() {
            expect(someOpt).to.be.instanceof(LazyOption);
            expect(noneOpt).to.be.instanceof(LazyOption);

            let someRes = someOpt.filter(val => true),
                noneRes = noneOpt.filter(val => true);

            expect(someRes).to.be.instanceof(Some);
            expect(noneRes).to.be.instanceof(None);
        });

        it("#filterNot", function() {
            expect(someOpt).to.be.instanceof(LazyOption);
            expect(noneOpt).to.be.instanceof(LazyOption);

            let someRes = someOpt.filterNot(val => false),
                noneRes = noneOpt.filterNot(val => false);

            expect(someRes).to.be.instanceof(Some);
            expect(noneRes).to.be.instanceof(None);
        });
    });

    describe("#create() static method", function() {
        it("should return an instance of 'LazyOption' when all necessary parameters are given", function() {
            let lazyOpt = LazyOption.create(() => 1, null, "foo", "bar");

            expect(lazyOpt).to.be.instanceof(LazyOption);
        });
    });
});
