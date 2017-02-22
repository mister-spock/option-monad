// None subclass of Option

let inst = null;

/**
 * Constructor
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

});

module.exports = None;
