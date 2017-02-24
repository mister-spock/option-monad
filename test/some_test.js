const {expect} = require("chai");
const {Option, Some} = require("../src/Option");

describe("'Some' instance of an 'Option' monad", function() {

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
});
