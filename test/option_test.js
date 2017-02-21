const
    assert = require("assert"),
    Option = require("../src/Option"),
    Some   = require("../src/Some"),
    None   = require("../src/None");

describe("Option monadic collection", function() {

    describe("#fromValue static method", function() {

        it("should return Some instance if some value was provided", function() {
            let opt = Option.fromValue("not-null");
            assert.ok(opt instanceof Some);
        });

        it("should return None instance if no value was provided", function() {
            let opt = Option.fromValue(null);
            assert.ok(opt instanceof None);
        });

        it("should return None instance if value provided equals to noneValue parameter", function() {
            let opt = Option.fromValue("not-null", "not-null");
            assert.ok(opt instanceof None);
        });
    });
});
