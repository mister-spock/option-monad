const {expect} = require("chai");
const {Option, None} = require("../src/Option");

describe("'None' variant of an 'Option' monad", function() {

    describe("#create() static method", function() {
        it("should return instance of self that is also an instance of Option", function() {
            let noneOpt = None.create();
            expect(noneOpt).to.be.instanceof(None);
            expect(noneOpt).to.be.instanceof(Option);
        });
    });

    describe("#isDefined() method", function() {
        it("should return 'false'", function() {
            let noneOpt = Option(null);
            expect(noneOpt.isDefined()).to.be.false;
        });
    });

    describe("#isEmpty() method", function() {
        it("should return 'true'", function() {
            let noneOpt = Option(null);
            expect(noneOpt.isEmpty()).to.be.true;
        });
    });

    describe("#get() method", function() {
        it("should throw error when called", function() {
            let noneOpt = Option(null);
            expect(() => { noneOpt.get(); }).to.throw(Error);
        });
    });

    describe("#getOrElse() method", function() {
        it("should return value passed to the method", function() {
            let expected = 1,
                result   = Option(null).getOrElse(expected);

            expect(result).to.be.deep.equal(expected);
        });
    });

    describe("#getOrCall() method", function() {
        it("should return value that a function passed to the method returns", function() {
            let expected = 1,
                result   = Option(null).getOrCall(() => expected);

            expect(result).to.be.deep.equal(expected);
        });

        it("should throw TypeError if the argument passed to the method is not a function", function() {
            let thrower = () => Option(null).getOrCall("not a function");

            expect(thrower).to.throw(TypeError);
        });
    });

    describe("#getOrThrow() method", function() {
        it("should throw error that has been passed to the method", function() {
            let thrower = () => Option(null).getOrThrow(new Error("error message"));

            expect(thrower).to.throw("error message");
        });

        it("should throw TypeError if argument passed to the method is not an instance of an 'Error'", function() {
            let thrower = () => Option(null).getOrThrow("not an error");

            expect(thrower).to.throw(TypeError);
        });
    });

    describe("#orElse() method", function() {
        it("should return the instance of an Option that has been passed to the method", function() {
            let expected = Option(1),
                result   = Option(null).orElse(expected);

            expect(result).to.be.deep.equal(expected);
        });

        it("should throw an TypeError if argument passed to the method is not an instance if Option", function() {
            let thrower = () => Option(null).orElse("not an option");

            expect(thrower).to.throw(TypeError);
        });
    });

    describe("#forAll() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.forAll(() => "some func")).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#map() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.map(() => "some func")).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#flatMap() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.flatMap(() => "some func")).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#filter() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.filter(() => true)).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#filterNot() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.filterNot(() => true)).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#select() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.select("some value")).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#reject() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            expect(noneOpt.reject("some value")).to.satisfy(opt => Object.is(opt, noneOpt));
        });
    });

    describe("#foldLeft() method", function() {
        it("should return itself", function() {
            let noneOpt    = Option(null),
                initialVal = 1;

            expect(noneOpt.foldLeft(initialVal)).to.be.deep.equal(initialVal);
        });
    });

    describe("#foldRight() method", function() {
        it("should return itself", function() {
            let noneOpt    = Option(null),
                initialVal = 1;

            expect(noneOpt.foldRight(initialVal)).to.be.deep.equal(initialVal);
        });
    });
});
