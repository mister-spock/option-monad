// None subclass of Option

const Option = require("./Option");

let inst = null;

function None() {}

Object.defineProperty(None, "create", {
    value: function() {
        if (inst && inst instanceof None) {
            return inst;
        }

        return new None();
    },
    enumerable: false,
    configurable: false,
    writable: false
});

Object.assign(None.prototype, {

});

module.exports = None;
