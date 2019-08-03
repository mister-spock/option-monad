const value = Symbol("okozak:option-monad:value");
const internalOpt = Symbol("okozak:option-monad:lazy-value");
const isResolved = Symbol("okozak:option-monad:lazy-is-resolved");
let noneInst = null;

/**
 * Option monad facade function
 * @param {Any} val A value (or it's absense) to be stored in the Some
 * @param {Any} noneValue A criteria of what value will be treated as a None case. Null by default
 * @returns {Option}
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
        return (val instanceof Some) || (val instanceof None) || (val instanceof LazyOption);
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

/**
 * Static method used to produce Option instance out of function return and a set of params
 * @param {Function} func Function from the return of which the result will be received
 * @param {Any} params Set of function params in a form of Rest parameter
 * @returns {Option}
 */
Object.defineProperty(Option, "fromReturn", {
    value: function(func, ...params) {
        if (!(func instanceof Function)) {
            throw new TypeError(`A function must be passed as the first argument of 'Option.fromReturn' method, "${typeof func}" given`);
        }
        return Option(func(...params));
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

/**
 * Static method that will ensure, that given value is an Option.
 * If the argument is not an option, it will be wrapped into one.
 * @param {Any} val Value to ensure
 * @returns {Option}
 */
Object.defineProperty(Option, "ensure", {
    value: function(val) {
        if (val instanceof Option) {
            return val;
        }
        else {
            return Option(val);
        }
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
    if (new.target !== Some) {
        throw new Error("'Some' is a constructor and should not be called as a function");
    }

    this[value] = val;
}

/**
 * Creates an instance of Some
 * @param {Any} val
 * @returns {Some}
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
 * @returns {None}
 */
function None() {
    if (new.target !== None) {
        throw new Error("'None' is a constructor and should not be called as a function");
    }
}

/**
 * Static method for creating an instance of None.
 * None is effectively a Singleton.
 * @returns {None}
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
 * Defines a lazy variant of the option that is resolved on demand, but not sooner.
 * @param {Function} callback A function that is going to be reolved on demand, should return an Option instance
 * @param {...any} inputParams Parameters that will be passed to the callback when needed
 * @returns {LazyOption}
 */
function LazyOption(callback, ...inputParams) {
    if (!(callback instanceof Function)) {
        throw new TypeError(`A function must be passed as the first argument of 'LazyOption.create' method, "${typeof callback}" given`);
    }

    this.cb = callback;
    this.params = inputParams;
    this[isResolved] = false;
    this[internalOpt] = undefined;
}

Object.defineProperty(LazyOption, 'create', {
    value: function(cb, ...params) {
        return new LazyOption(cb, ...params);
    },
    enumerable: false,
    configurable: false,
    writable: false
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
            throw new TypeError(`Argument passed to the Option.forAll method has to be a function, "${typeof func}" given`);
        }
        func(this[value]);
        return this;
    },

    map(func) {
        if (!(func instanceof Function)) {
            throw new TypeError(`Argument passed to the Option.map method has to be a function, "${typeof func}" given`);
        }

        return new Some(func(this[value]));
    },

    flatMap(func) {
        if (!(func instanceof Function)) {
            throw new TypeError(`Argument passed to the Option.flatMap method has to be a function, "${typeof func}" given`);
        }

        let result = func(this[value]);

        if (!(result instanceof Option)) {
            throw new Error("Function passed to 'flatMap' must return instance of Option. Maybe use 'map'?");
        }

        return result;
    },

    filter(func) {
        if (!(func instanceof Function)) {
            throw new TypeError(`Argument passed to the Option.filter method has to be a function, "${typeof func}" given`);
        }

        if (Object.is(true, func(this[value]))) {
            return this;
        }

        return None.create();
    },

    filterNot(func) {
        if (!(func instanceof Function)) {
            throw new TypeError(`Argument passed to the Option.filterNot method has to be a function, "${typeof func}" given`);
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
            throw new TypeError(`Second argument passed to the Option.foldLeft method has to be a function, "${typeof func}" given`);
        }
        return func(initialVal, this[value]);
    },

    foldRight(initialVal, func) {
        if (!(func instanceof Function)) {
            throw new TypeError(`Second argument passed to the Option.foldRight method has to be a function, "${typeof func}" given`);
        }
        return func(this[value], initialVal);
    },

    toString() {
        return `Some(${this[value]})`;
    },

    /**
     * Given that Option is a collection, it should be iterable by default
     * @returns {Iterator}
     */
    *[Symbol.iterator]() {
        yield this[value];
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
            throw new TypeError(`Argument passed to the Option.getOrCall method has to be a function, "${typeof func}" given`);
        }
        return func();
    },

    getOrThrow(error) {
        if (!(error instanceof Error)) {
            throw new TypeError(`Argument passed to the Option.getOrThrow method has to be an instance of Error, "${typeof error}" given`);
        }
        throw error;
    },

    orElse(elseOpt) {
        if (!(elseOpt instanceof Option)) {
            throw new TypeError(`Argument passed to the Option.orElse method has to be an instance of Option, "${typeof elseOpt}" given`);
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
    },

    toString() {
        return "None()";
    },

    *[Symbol.iterator]() {
        // Empty iterator for None case
        return;
    }
});

Object.assign(LazyOption.prototype, {
    _resolve() {
        if (!this[isResolved]) {
            const result = this.cb(...this.params);
            if (!(result instanceof Option)) {
                throw TypeError(`'LazyOption' callback should return an 'Option', ${typeof result} returned`);
            }
            this[isResolved] = true;
            this[internalOpt] = result;
        }
        return this[internalOpt];
    },

    isResolved() {
        return this[isResolved];
    },

    isDefined() {
        return this._resolve().isDefined();
    },

    isEmpty() {
        return this._resolve().isEmpty();
    },

    get() {
        return this._resolve().get();
    },

    getOrElse(defaultVal) {
        return this._resolve().getOrElse(defaultVal);
    },

    getOrCall(func) {
        return this._resolve().getOrCall(func);
    },

    getOrThrow(error) {
        throw this._resolve().getOrThrow(error);
    },

    orElse(elseOpt) {
        return this.resolve().orElse(elseOpt);
    },

    forAll(func) {
        return this._resolve().forAll(func);
    },

    map(func) {
        return this._resolve().map(func);
    },

    flatMap(func) {
        return this._resolve().flatMap(func);
    },

    filter(func) {
        return this._resolve().filter(func);
    },

    filterNot(func) {
        return this._resolve().filterNot(func);
    },

    select(val) {
        return this._resolve().select(val);
    },

    reject(val) {
        return this._resolve().reject(val);
    },

    foldLeft(initialVal, func) {
        return this._resolve().foldLeft(initialVal, func);
    },

    foldRight(initialVal, func) {
        return this._resolve().foldRight(initialVal, func);
    },

    toString() {
        return `LazyOption(function, ...parameters)`;
    },

    /**
     * Given that Option is a collection, it should be iterable by default.
     * Yields an iterator or nothing from the internal Option, after it has been resolved.
     * @returns {Iterator}
     */
    *[Symbol.iterator]() {
        yield *this._resolve();
    }
});

module.exports = {
    Option,
    LazyOption,
    Some,
    None
};
