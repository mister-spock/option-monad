# JavaScript `Option` monad type

[![NPM](https://img.shields.io/npm/v/option-monad.svg)](https://www.npmjs.com/package/option-monad)
[![Build Status](https://app.travis-ci.com/mister-spock/option-monad.svg?branch=master)](https://app.travis-ci.com/github/mister-spock/option-monad)

This adds an Option monad type for JavaScript.

The Option type is intended for cases where you sometimes might return a value (typically an object), and sometimes you might return no value (typically null) depending on arguments, or other runtime factors.

On one hand, the Option type forces a developer to consciously think about both cases (returning a value, or returning no value). That in itself will already make your code more robust. On the other hand, the Option type also allows the API developer to provide more concise API methods, and empowers the API user in how he consumes these methods.

## Installation

Module can be easily installed with NPM:
```bash
npm install --save option-monad
```

## Usage

Simply require it in your code:
```javascript
const { Option } = require("option-monad");
```

Module consists of `Option` facade function, and two concrete variants of an Option: `Some` and `None` constructors.
`Option` type supports chaining of the standard set of **transformations**:
* `map(func: Any => Any): Option`
* `flatMap(func: Any => Option): Option`
* `filter(func: Any => Boolean): Option`
* `filterNot(func: Any => Boolean): Option`
* `select(val: Any): Option`
* `reject(val: Any): Option`
* `foldLeft(initial: T, func: Any => T): T`
* `foldRight(initial: T, func: Any => T): T`

It also has two methods for **querying**:
* `isDefined(): Boolean`
* `isEmpty(): Boolean`

Keep in mind, that **not any** of those methods will mutate the `Option` instance they were called on.

### 'Option' facade function

Offers singular entry point to work with options. It is worth remembering that this is **not a constructor**, so it will throw `Error` when called with a `new` operator.

Function signature is:
```javascript
function Option(value, noneValue = null) { ... }
```

, where `value` is the value, that is going to be stored in an Option. You can also supply value to the `noneValue` argument that will be used as a criteria of the `None` case.

### 'LazyOption' type

Offers a lazy zounterpart for the `Option` type. Takes a callback and a set of arguments to apply to it. Will internally store those, up until the computation of the option result is required. Callback should return an instance of `Option` (and, potentially, can return another `LazyOption`).

IS a constructor. But possesses `create` static method to create it's instance. IS an Iterable.

Possesses all of the `Option` type's **transformation** and **query** methods (those are mapped to internal `Option` that is a result of the `callback` computation), plus it's own `isResolved` method that exposes it's internal state.

#### Example:
```javascript
let resultOne = Option(1);        // will result in a Some instance
let resultTwo = Option(2, 2);     // will result in a None instance
```

**Both "Some", "None", and "LazyOption" instances are also considered instances of the "Option" type:**
```javascript
let someOpt = Option("value");

console.log(someOpt instanceof Some);       // true
console.log(someOpt instanceof Option);     // true
```

or

```javascript
let noneOpt = Option(null);

console.log(noneOpt instanceof None);       // true
console.log(noneOpt instanceof Option);     // true
```

or

```javascript
let lazy = LazyOption.create(() => Option(1));

console.log(lazy instanceof LazyOption); // true
console.log(lazy instanceof Option);     // true
```

**Option.fromReturn() method:**

Signature:
```javascript
Option.fromReturn(func, ...args);
```

Allows you to build on Option instance out of a function and a set of arguments to be passed to it:
```javascript
let opt = Option.fromReturn((val1, val2) => { val1 * val2 }, 2, 20);

console.log(opt.get());     // 40
```

**Option.ensure() method (v1.2.0):**

Signature:
```javascript
Option.ensure(val);
```

It will ensure, that any value given to it is an Option. If not - it will be wrapped into one:
```javascript
let valueOne = "val",
    valueTwo = Option("other");

Option.ensure(valueOne);   // Some {}
Option.ensure(valueTwo);   // Some {}
```

**LazyOption (v1.5.0)**

```javascript
const lazy = LazyOption.create((foo, bar) => Option(foo + bar), "Foo", "Bar");

lazy.map(v => v.toUpperCase())
    .filter(v => v.length > 0)
    .getOrElse("");             // "FooBar"
```

### Examples

#### You can build functions that have a determined return type:

```javascript
const {Some, None} = require("option-monad");

function someFunc(criteria) {
    let ret = someApi.getObject();

    if (ret === criteria) {
        return Some.create(ret); // You can also use "new Some(ret)" as well
    }

    // None is a singleton
    return None.create();
}
```
You can be completely sure that such function will always return `Option` type value.

#### Getting the value out of an Option:

```javascript
let val = someFunc(true).get();
```
Will throw an `Error` if the return value is `None`.

#### Falling back to a default value:

```javascript
let val = someFunc(true).getOrElse("fallback");

/* or ... */

let val = someFunc(true).getOrCall(() => { {foo: "fallback"} });
```

#### You can try different alternate options:

```javascript
return someFunc(true)
    .orElse(someOtherApi().getObject())
    .orElse(someCrappyApi().getDefault());
```

#### You can utilize 'LazyOption' for delayed computation as a backup variant

```javascript
return someFunc(true)
    .orElse(LazyOption.create(() => someOtherApi().getObject());
```

## Development

You can make use of a couple of NPM scripts out there:
* `npm run lint` runs ESLint for library and test sources
* `npm test` runs Jest-powered tests
* `npm run build` runs both linting and tests
