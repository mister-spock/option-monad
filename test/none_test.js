const
    assert = require("assert"),
    Option = require("../src/Option"),
    None   = require("../src/None");

describe("'None' instance of an 'Option' monad", function() {

    describe("#create() static method", function() {

        it("should return instance of self that is also an instance of Option", function() {
            let noneOpt = None.create();
            assert.ok(noneOpt instanceof None);
            assert.ok(noneOpt instanceof Option);
        });
    });
});
