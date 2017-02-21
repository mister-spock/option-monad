// Some subclass of Option

const
    Option = require("./Option"),
    value  = Symbol("okozak:option-js:value");

function Some(val) {
    this[value] = val;
}

Object.defineProperty(Some, "create", {
    value: function(val) {
        return new Some(val);
    },
    enumerable: false,
    configurable: false,
    writable: false
});

Object.assign(Some.prototype, {
    
});

module.exports = Some;
