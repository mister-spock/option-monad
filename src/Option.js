// Option base abstract class
const
    Some = require("./Some"),
    None = require("./None");

/**
 * Option monad facade function
 * @param {Any} val A value (or it's absense) to be stored in the Some
 * @param {Any} noneValue A criteria of what value will be treated as a None case. Null by default
 * @return {Option}
 */
function Option(val, noneValue = null) {
    if (new.target) {
        throw new Error("'Option' is not a constructor!");
    }

    return Object.is(val, undefined) || Object.is(val, noneValue) ?
        new None() :
        new Some(val);
}

/**
 * Used by 'instanceof' operator to make sure Some and None are considered Option instances
 */
Object.defineProperty(Option, Symbol.hasInstance, {
    value: function(value) {
        return (value instanceof Some) || (value instanceof None);
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

module.exports = Option;
