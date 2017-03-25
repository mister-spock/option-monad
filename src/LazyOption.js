const lazyCallback = Symbol("okozak:option-monad:lazy-callback");
const lazyParams   = Symbol("okozak:option-monad:lazy-params");
const nullVal      = Symbol("okozak:option-monad:lazy-null-val");
const value        = Symbol("okozak:option-monad:lazy-value");
const {Option}     = require("./Option");

/**
 * LazyOption constructor
 * Implements lazy evaluation in a form of an option
 * @param {Function} callback
 * @param {Any} nullValue
 * @param {Array} [callParams]
 * @return {LazyOption}
 */
function LazyOption(callback, nullValue, ...callParams) {
    if (callback instanceof Function) {
        this[value]        = undefined;
        this[lazyCallback] = callback;
        this[lazyParams]   = callParams;
        this[nullVal]      = nullValue;
        this.isEvaluated   = false;
    }
    else {
        this[value]      = Option(callback, nullValue);
        this.isEvaluated = true;
    }
}

/**
 * Static method to create an instance of LazyOption
 * @param {Function} callback
 * @param {Any} nullValue
 * @param {Array} [callParams]
 * @return {LazyOption}
 */
Object.defineProperty(LazyOption, 'create', {
    value: function(callback, nullValue, ...callParams) {
        return new LazyOption(callback, nullValue, ...callParams);
    },
    enumerable   : false,
    configurable : false,
    writable     : false
});

Object.assign(LazyOption.prototype, {
    _evaluate() {
        if (Object.is(this[value], undefined)) {
            this.isEvaluated = true;
            this[value]      = Option(this[lazyCallback](...this[lazyParams]), this[nullVal]);
        }
        return this[value];
    },

    isDefined() {
        return this._evaluate().isDefined();
    },

    isEmpty() {
        return this._evaluate().isEmpty();
    },

    get() {
        return this._evaluate().get();
    },

    getOrElse(defaultVal) {
        return this._evaluate().getOrElse(defaultVal);
    },

    getOrCall(func) {
        return this._evaluate().getOrCall(func);
    },

    getOrThrow(error) {
        return this._evaluate().getOrThrow(error);
    },

    orElse(elseOpt) {
        return this._evaluate().orElse(elseOpt);
    },

    forAll(func) {
        return this._evaluate().forAll(func);
    },

    map(func) {
        return this._evaluate().map(func);
    },

    flatMap(func) {
        return this._evaluate().flatMap(func);
    },

    filter(func) {
        return this._evaluate().filter(func);
    },

    filterNot(func) {
        return this._evaluate().filterNot(func);
    },

    select(val) {
        return this._evaluate().select(val);
    },

    reject(val) {
        return this._evaluate().reject(val);
    },

    foldLeft(initialVal, func) {
        return this._evaluate().foldLeft(initialVal, func);
    },

    foldRight(initialVal, func) {
        return this._evaluate().foldRight(initialVal, func);
    },

    toString() {
        let stringRep = this.isEvaluated ? this[value] : this[lazyCallback];
        return `LazyOption(${stringRep})`;
    }
});


module.exports = LazyOption;
