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

    describe("#isDefined() method", function() {
        it("should return 'false'", function() {
            let noneOpt = Option(null);
            assert.ok(!noneOpt.isDefined());
        });
    });

    describe("#isEmpty() method", function() {
        it("should return 'true'", function() {
            let noneOpt = Option(null);
            assert.ok(noneOpt.isEmpty());
        });
    });

    describe("#get() method", function() {
        it("should throw error when called", function() {
            let noneOpt = Option(null);
            assert.throws(() => {
                noneOpt.get();
            });
        });
    });

    describe("#getOrElse() method", function() {
        it("should return value passed to the method", function() {
            let expected = 1,
                result   = Option(null).getOrElse(expected);
            assert.deepEqual(expected, result);
        });
    });

    describe("#getOrCall() method", function() {
        it("should return value that a function passed to the method returns", function() {
            let expected = 1,
                result   = Option(null).getOrCall(() => expected);
            assert.deepEqual(expected, result);
        });

        it("should throw error if the argument passed to the method is not a function", function() {
            assert.throws(() => {
                Option(null).getOrCall("not a function");
            });
        });
    });

    describe("#getOrThrow() method", function() {
        it("should throw error that has been passed to the method", function() {
            assert.throws(() => {
                Option(null).getOrThrow(new Error("error message"), "error message");
            });
        });

        it("should throw error if argument passed to the method is not an instance of an 'Error'", function() {
            assert.throws(() => {
                Option(null).getOrThrow("not an error");
            });
        });
    });

    describe("#orElse() method", function() {
        it("should return the instance of an Option that has been passed to the method", function() {
            let expected = Option(1),
                result   = Option(null).orElse(expected);
            assert.deepEqual(expected, result);
        });

        it("should throw an error if argument passed to the method is not an instance if Option", function() {
            assert.throws(() => {
                Option(null).orElse("not an option");
            });
        });
    });

    describe("#forAll() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.forAll(() => "some func")));
        });
    });

    describe("#map() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.map(() => "some func")));
        });
    });

    describe("#flatMap() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.flatMap(() => "some func")));
        });
    });

    describe("#filter() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.filter(() => true)));
        });
    });

    describe("#filterNot() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.filterNot(() => true)));
        });
    });

    describe("#select() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.select("some value")));
        });
    });

    describe("#reject() method", function() {
        it("should return itself", function() {
            let noneOpt = Option(null);
            assert.ok(Object.is(noneOpt, noneOpt.reject("some value")));
        });
    });

    describe("#foldLeft() method", function() {
        it("should return itself", function() {
            let noneOpt    = Option(null),
                initialVal = 1;

            assert.deepEqual(noneOpt.foldLeft(initialVal), initialVal);
        });
    });

    describe("#foldRight() method", function() {
        it("should return itself", function() {
            let noneOpt    = Option(null),
                initialVal = 1;

            assert.deepEqual(noneOpt.foldRight(initialVal), initialVal);
        });
    });
});
