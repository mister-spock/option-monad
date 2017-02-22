// Some case of an Option
const value = Symbol("okozak:option-js:value");

/**
 * Constructor
 * @param {Any} val
 */
function Some(val) {
    this[value] = val;
}

/**
 * Creates an instance of Some
 * @param {Any} val
 * @return {Some}
 */
Object.defineProperty(Some, "create", {
    value: function(val) {
        if (Object.is(val, undefined)) {
            throw new Error("Value must be passed to Some.create() method!");
        }
        return new Some(val);
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

Object.assign(Some.prototype, {
    isDefined() {
        return true;
    },

    isEmpty() {
        return false;
    },

    get() {
        return this[value];
    },

    getOrElse() {
        return this[value];
    },

    getOrCall() {
        return this[value];
    },

    getOrThrow() {
        return this[value];
    },

    orElse() {
        return this;
    }
});

module.exports = Some;
