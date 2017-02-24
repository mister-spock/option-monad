const {expect} = require("chai");
const {Option, Some, None} = require("../src/Option");

describe("'Option' monad", function() {

    it("should throw Error when used as a constructor", function() {
        let thrower = () => new Option("value");

        expect(thrower).to.throw(Error);
    });

    it("should return instance of self as a result of call", function() {
        let someOpt = Option(1);
        let noneOpt = Option(null);

        expect(someOpt).to.be.instanceof(Option);
        expect(noneOpt).to.be.instanceof(Option);
    });

    it("should return Some(value) if value has been given on call", function() {
        let someOpt = Option("value");
        expect(someOpt).to.be.instanceof(Some);
    });

    it("should return None() if NO value has been given on call", function() {
        let noneOpt = Option();
        expect(noneOpt).to.be.instanceof(None);
    });

    it("should return None() if value value given on call matches the value of 'noneValue' parameter", function() {
        let noneOpt = Option(1, 1);
        expect(noneOpt).to.be.instanceof(None);
    });

    describe("#fromReturn() static method", function() {
        it("should return instance of Option when called properly", function() {
            let func = (a, b) => { a + b },
                opt  = Option.fromReturn(func, "foo", "bar");

            expect(opt).to.be.instanceof(Option);
        });

        it("should throw TypeError when the first argument passed is not a function", function() {
            let thrower = () => {
                Option.fromReturn("not-a-function", "foo", "bar");
            };
            expect(thrower).to.throw(TypeError);
        });
    });
});
