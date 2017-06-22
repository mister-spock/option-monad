const {expect} = require("chai");
const {Option, Some, None} = require("../lib/option");

describe("'Some' variant of an 'Option' monad", function() {

    describe("#create() static method", function() {
        it("should return instance of self that is also an instance of Option", function() {
            let someOpt = Some.create(1);
            expect(someOpt).to.be.instanceof(Some);
            expect(someOpt).to.be.instanceof(Option);
        });

        it("should throw an error if no value has been given on call", function() {
            let thrower = () => Some.create();
            expect(thrower).to.throw(Error);
        });
    });

    describe("#isDefined() method", function() {
        it("should return 'true'", function() {
            let someOpt = Option(1);
            expect(someOpt.isDefined()).to.be.true;
        });
    });

    describe("#isEmpty() method", function() {
        it("should return 'false'", function() {
            let someOpt = Option(1);
            expect(someOpt.isEmpty()).to.be.false;
        });
    });

    describe("#getOrElse() method", function() {
        it("should return stored value", function() {
            let someOpt = Option(1);
            expect(someOpt.getOrElse(null)).to.be.deep.equal(1);
        });
    });

    describe("#getOrCall() method", function() {
        it("should return stored value", function() {
            let someOpt = Option(1);
            expect(someOpt.getOrCall(() => "some function")).to.be.deep.equal(1);
        });
    });

    describe("#getOrThrow() method", function() {
        it("should return stored value", function() {
            let someOpt = Option(1);
            expect(someOpt.getOrThrow(new Error("some error"))).to.be.deep.equal(1);
        });
    });

    describe("#orElse() method", function() {
        it("should return stored value wrapped in an option", function() {
            let someOpt = Option(1);
            expect(someOpt.orElse(new Some(1))).to.satisfy(opt => Object.is(opt, someOpt));
        });
    });

    describe("#forAll() method", function() {
        it("should accept a function and call it on inner value", function() {
            Option("new value").forAll(val => {
                expect(val).to.be.deep.equal("new value");
            });
        });

        it("should not mutate inner value", function() {
            let someOpt = Option("some value");

            someOpt.forAll(val => val + val);

            expect(someOpt.get()).to.be.deep.equal("some value");
        });

        it("should throw TypeError when the argument supplied is not a Function", function() {
            expect(() => Option(1).forAll("not a func!")).to.throw(TypeError);
        });
    });

    describe("#map() method", function() {
        it("should accept a function and call it on inner value", function() {
            Option("some value").map((val) => {
                expect(val).to.be.deep.equal("some value");
                return val;
            });
        });

        it("should return function's return value wrapped into Some", function() {
            let someOpt = Option(1);
            expect(someOpt.map(val => val * 2).get()).to.be.deep.equal(2);
        });

        it("should not mutate inner value of the original instance", function() {
            let someOpt   = Option(1),
                mappedOpt = someOpt.map(val => val * 2);

            expect(someOpt.get()).to.be.deep.equal(1);
            expect(mappedOpt.get()).to.be.deep.equal(2);
        });

        it("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).map("not a func!")).to.throw(TypeError);
        });
    });

    describe("#flatMap() method", function() {
        it("should accept a function and call it on inner value", function() {
            Option("some value").flatMap((val) => {
                expect(val).to.be.deep.equal("some value");
                return Option(val);
            });
        });

        it("should return function's return value wrapped into Some", function() {
            let someOpt = Option(1);
            expect(someOpt.flatMap(val => Option(val * 2)).get()).to.be.deep.equal(2);
        });

        it("should not mutate inner value of the original instance", function() {
            let someOpt   = Option(1),
                mappedOpt = someOpt.flatMap(val => Option(val * 2));

            expect(someOpt.get()).to.be.deep.equal(1);
            expect(mappedOpt.get()).to.be.deep.equal(2);
        });

        it("should throw Error if the argumnet function's return value is not an Option instance", function() {
            let someOpt = Option(1);

            expect(() => someOpt.flatMap(val => val * 2)).to.throw(Error);
        });

        it("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).flatMap("not a func!")).to.throw(TypeError);
        });
    });

    describe("#filter() method", function() {
        it("should return Some if filtering function returns 'true'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filter(val => val === 1);

            expect(filtered).to.be.instanceof(Some);
            expect(filtered.get()).to.be.deep.equal(1);
        });

        it("should return None if filtering function returns 'false'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filter(val => val !== 1);

            expect(filtered).to.be.instanceof(None);
        });

        it("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).filter("not a func!")).to.throw(TypeError);
        });
    });

    describe("#filterNot() method", function() {
        it("should return Some if filtering function returns 'false'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filterNot(val => val !== 1);

            expect(filtered).to.be.instanceof(Some);
            expect(filtered.get()).to.be.deep.equal(1);
        });

        it("should return None if filtering function returns 'true'", function() {
            let someOpt  = Option(1),
                filtered = someOpt
                    .filterNot(val => val === 1);

            expect(filtered).to.be.instanceof(None);
        });

        it("should throw TypeError when the argument supplied is not a function", function() {
            expect(() => Option(1).filterNot("not a func!")).to.throw(TypeError);
        });
    });

    describe("#select() method", function() {
        it("should return Some if the argument is equal to inner value", function() {
            let someOpt  = Option("value"),
                selected = someOpt.select("value");

            expect(selected).to.be.instanceof(Some);
            expect(selected.get()).to.be.deep.equal("value");
        });

        it("should return None if the argument is not equal to inner value", function() {
            let someOpt  = Option("value"),
                selected = someOpt.select("value1");

            expect(selected).to.be.instanceof(None);
        });
    });

    describe("#reject() method", function() {
        it("should return Some if the argument is not equal to inner value", function() {
            let someOpt  = Option("value"),
                rejected = someOpt.reject("value1");

            expect(rejected).to.be.instanceof(Some);
            expect(rejected.get()).to.be.deep.equal("value");
        });

        it("should return None if the argument is equal to inner value", function() {
            let someOpt  = Option("value"),
                rejected = someOpt.reject("value");

            expect(rejected).to.be.instanceof(None);
        });
    });

    describe("#foldLeft() method", function() {
        it([
            "should accept initial value and folding function",
            "and return the result of applying a function on initial value",
            "and inner value of the Option"
        ].join(' '), function() {
            let someOpt = Option(1),
                result  = someOpt.foldLeft(10, (initial, inner) => initial + inner);

            expect(result).to.be.deep.equal(11);
        });

        it([
            "folding function first argument has to be an initial value of the method call,",
            "and the second argument has to be the inner value of the Option"
        ].join(' '), function() {
            let someOpt     = Option(1),
                initialVal  = 10,
                foldingFunc = (initial, inner) => {
                    expect(initial).to.be.deep.equal(initialVal);
                    expect(inner).to.be.deep.equal(1);
                    return initial + inner;
                };

            someOpt.foldLeft(initialVal, foldingFunc);
        });

        it("should throw TypeError if the second argument of the method is not a folding function", function() {
            expect(() => Option(1).foldLeft(1, "not a func!")).to.throw(TypeError);
        });
    });

    describe("#foldRight() method", function() {
        it([
            "should accept initial value and folding function",
            "and return the result of applying a function on initial value",
            "and inner value of the Option"
        ].join(' '), function() {
            let someOpt = Option(1),
                result  = someOpt.foldRight(10, (inner, initial) => inner + initial);

            expect(result).to.be.deep.equal(11);
        });

        it([
            "folding function first argument has to be the inner value of the Option,",
            "and the second argument has to be the initial value of the method call"
        ].join(' '), function() {
            let someOpt     = Option(1),
                initialVal  = 10,
                foldingFunc = (inner, initial) => {
                    expect(initial).to.be.deep.equal(initialVal);
                    expect(inner).to.be.deep.equal(1);
                    return inner + initial;
                };

            someOpt.foldRight(initialVal, foldingFunc);
        });

        it("should throw TypeError if the second argument of the method is not a folding function", function() {
            expect(() => Option(1).foldRight(1, "not a func!")).to.throw(TypeError);
        });
    });

    describe("#toString() method", function() {
        it("should return correct value when called", function() {
            let someOpt = Option(1);
            expect(someOpt.toString()).to.be.deep.equal("Some(1)");
        });
    });
});
