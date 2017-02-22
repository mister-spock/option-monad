const
    assert = require("assert"),
    Option = require("../src/Option"),
    Some   = require("../src/Some");

describe("'Some' instance of an 'Option' monad", function() {

    describe("#create() static method", function() {

        it("should return instance of self that is also an instance of Option", function() {
            let someOpt = Some.create(1);
            assert.ok(someOpt instanceof Some);
            assert.ok(someOpt instanceof Option);
        });

        it("should throw an error if no value has been given on call", function() {
            assert.throws(() => {
                Some.create();
            });
        });
    });
});
