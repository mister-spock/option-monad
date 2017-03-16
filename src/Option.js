const value = Symbol("okozak:option-monad:value");
let noneInst = null;

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
    value: function(val) {
        return (val instanceof Some) || (val instanceof None);
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

/**
 * Static method used to produce Option instance out of function return and a set of params
 * @param {Function} func Function from the return of which the result will be received
 * @param {Any} params Set of function params in a form of Rest parameter
 * @return {Option}
 */
Object.defineProperty(Option, "fromReturn", {
    value: function(func, ...params) {
        if (!(func instanceof Function)) {
            throw new TypeError("A function must be passed as the first argument of 'Option.fromReturn' method");
        }
        return Option(func(...params));
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});


// Some case of an Option

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

// None case of an Option

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
        if (noneInst && noneInst instanceof None) {
            return noneInst;
        }
        return new None();
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

/**
 * Define prototype methods
 */

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
    },

    forAll(func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.forAll method has to be a function");
        }
        func(this[value]);
        return this;
    },

    map(func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.map method has to be a function");
        }

        return new Some(func(this[value]));
    },

    flatMap(func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.flatMap method has to be a function");
        }

        let result = func(this[value]);

        if (!(result instanceof Option)) {
            throw new Error("Function passed to 'flatMap' must return instance of Option. Maybe use 'map'?");
        }

        return result;
    },

    filter(func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.filter method has to be a function");
        }

        if (Object.is(true, func(this[value]))) {
            return this;
        }

        return None.create();
    },

    filterNot(func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.filterNot method has to be a function");
        }

        if (Object.is(false, func(this[value]))) {
            return this;
        }

        return None.create();
    },

    select(val) {
        if (val === this[value]) {
            return this;
        }
        return None.create();
    },

    reject(val) {
        if (val === this[value]) {
            return None.create();
        }
        return this;
    },

    foldLeft(initialVal, func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.foldLeft method has to be a function");
        }
        return func(initialVal, this[value]);
    },

    foldRight(initialVal, func) {
        if (!(func instanceof Function)) {
            throw new TypeError("Argument passed to the Option.foldRight method has to be a function");
        }
        return func(this[value], initialVal);
    }
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
            throw new TypeError("Argument passed to the Option.getOrCall method has to be a function");
        }
        return func();
    },

    getOrThrow(error) {
        if (!(error instanceof Error)) {
            throw new TypeError("Argument passed to the Option.getOrThrow method has to be an instance of Error");
        }
        throw error;
    },

    orElse(elseOpt) {
        if (!(elseOpt instanceof Option)) {
            throw new TypeError("Argument passed to the Option.orElse method has to be an instance of Option");
        }
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

module.exports = {
    Option,
    Some,
    None
};
