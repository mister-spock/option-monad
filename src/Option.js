// Option base abstract class
const
    Some = require("./Some"),
    None = require("./None");

function Option() {
    throw new Error("You cannot instantiate an 'abstract' Option class, use Some/None or static methods!");
}

Object.defineProperties(Option, {
    fromValue: {
        value: function(value, noneValue = null) {
            if (value === noneValue || Object.is(value, noneValue)) {
                return new None();
            }

            return new Some(value);
        },
        enumerable: false,
        configurable: false,
        writable: false
    },

    ensure: {
        value: function(value, noneValue = null) {
            if (value instanceof Option) {
                return value;
            }

            return Option.fromValue(value);
        },
        enumerable: false,
        configurable: false,
        writable: false
    }
});

module.exports = Option;
