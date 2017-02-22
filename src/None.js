// None case of an Option
let inst = null;

/**
 * Constructor
 * @return {None}
 */
function None() {}

/**
 * Static method for creating an instance of None.
 * None is effectively a Singleton.
 * @return {None}
 */
Object.defineProperty(None, "create", {
    value: function() {
        if (inst && inst instanceof None) {
            return inst;
        }
        return new None();
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

Object.assign(None.prototype, {
    isDefined() {
        return false;
    },

    isEmpty() {
        return true;
    },

    get() {
        throw new Error("None has no value");
    },

    getOrElse(defaultVal) {
        return defaultVal;
    },

    getOrCall(func) {
        if (!(func instanceof Function)) {
            throw new Error("Argument passed to the None.getOrCall method has to be a function");
        }
        return func();
    },

    getOrThrow(error) {
        if (!(error instanceof Error)) {
            throw new Error("Argument passed to the None.getOrThrow method has to be an instance of Error");
        }
        throw error;
    },

    orElse(elseOpt) {
        return elseOpt;
    },

    forAll() {
        return this;
    },

    map() {
        return this;
    },

    flatMap() {
        return this;
    },

    filter() {
        return this;
    },

    filterNot() {
        return this;
    },

    select() {
        return this;
    },

    reject() {
        return this;
    },

    foldLeft(initialVal) {
        return initialVal;
    },

    foldRight(initialVal) {
        return initialVal;
    }
});

module.exports = None;
