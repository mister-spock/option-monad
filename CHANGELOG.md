##### v1.4.2 Security fixes
* Updated packages versions
* Migrated to Gulp v4 for development

##### v1.4.0 Make Option an Iterable object
* Both variants of Option (Some|None) are now Iterable
* Can be used in "for-of" loops
* Can be used in other delegating generator functions

##### v1.3.1 Add CI, refactor project structure
* Added support of Travis CI
* Moved library files under `lib` directory
* Migrated to npm v5
* Added `package-lock.json`

##### v1.3.0 Drop support for LazyOption
* Dropped support for LazyOption because it was really flawed and unnecessary concept in an asynchronous environment like Node

##### v1.2.0 Option.ensure() static method
* Better 'toString' representation for all options
* More test

##### v1.1.0 LazyOption type introduction
* Better error verbosity
* A bit more tests
