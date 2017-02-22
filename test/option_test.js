const
    assert = require("assert"),
    Option = require("../src/Option"),
    Some   = require("../src/Some"),
    None   = require("../src/None");

describe("'Option' monad", function() {

    it("should throw Error when used as a constructor", function() {
        assert.throws(() => {
            new Option("value");
        });
    });

    it("should return instance of self as a result of call", function() {
        let someOpt = Option(1);
        let noneOpt = Option(null);

        assert.ok(someOpt instanceof Option);
        assert.ok(noneOpt instanceof Option);
    });

    it("should return Some(value) if value has been given on call", function() {
        let someOpt = Option("value");
        assert.ok(someOpt instanceof Some);
    });

    it("should return None() if NO value has been given on call", function() {
        let noneOpt = Option();
        assert.ok(noneOpt instanceof None);
    });

    it("should return None() if value value given on call matches the value of 'noneValue' parameter", function() {
        let noneOpt = Option(1, 1);
        assert.ok(noneOpt instanceof None);
    });
});
