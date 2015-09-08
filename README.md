# babel-plugin-rewire



A Babel plugin that adds the ability to rewire module dependencies.

[![Build Status](https://travis-ci.org/speedskater/babel-plugin-rewire.svg)](https://travis-ci.org/speedskater/babel-plugin-rewire) [![Join the chat at https://gitter.im/speedskater/babel-plugin-rewire](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/speedskater/babel-plugin-rewire?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

It is inspired by [rewire.js](https://github.com/jhnns/rewire) and transfers its concepts to es6 using babel.

It is useful for writing tests, specifically to mock the dependencies of the module under test.

Therefore for each module it adds and exports the methods `__GetDependency__`, `__Rewire__`, and `__ResetDependency__`.
For compatibility reasons with rewire.js, the methods `__get__` and `__set__` are exported as well.
These methods allow you to rewire the module under test.
Furthermore in case of a default export these methods are assigned to the existing default export, except for default exports of primitive types (boolean, number, string, ...).

An additional object named `__RewireAPI__` is exported as named export as well as a property of the default export. This object itself contains all the functions mentioned above as fields. This enables one to rewire members of the imported module itself without explicitly importing the module (see [Handling of default exports](#handling-of-default-exports) below).

##ES6 Imports and React

Dependencies from import statements can be rewired

###Example

```javascript
import ChildComponent from 'child-component-module';

export default class MyFancyWrapperComponent extends React.Component {

	render() {
		return (<div className="wrapper-style">
			<ChildComponent {...this.props} />
		</div>);
	}
}
```

### Test Code

```javascript
import ComponentToTest from 'my-fancy-wrapper-component-module';

ComponentToTest.__Rewire__('ChildComponent', React.createClass({
    render: function() { return <div {...this.props}></div>; }
}));
....

ComponentToTest.__ResetDependency__('ChildComponent');
```

##Node/browserify require() and top-level var support

Variables declared and initialised at the top level, such as those from require() calls, can be rewired

###Example

```javascript
var Path = require('path');

var env = 'production';

module.exports = function(name) {
	return Path.normalise(name);
}
```

### Test Code

```javascript
var Normaliser = require('Normaliser');

Normaliser.__Rewire__('Path', {
  normalise: (name) => name;
});

Normaliser.__Rewire__('env', 'testing');
....

Normaliser.__ResetDependency__('Path');
```

## Named and top level function rewiring

Besides top level variables also top level functions defined in the imported module can be rewired.

When exported functions of a module depend on each other it can be convenient to test them independently.
Hence, babel-plugin-rewire allows you to rewire the internal dependencies to exported named functions as shown in the example below.

Be aware, that rewiring a named export does not influence imports of that same export in other modules!

### Example
Asuming you have a module `TodoOperations.js` that internaly uses an asynchronous api to fetch some information
```js
function fetchToDos() {
   ...
   return new Promise(...);
}

export function filterToDos( filterString ) {
   return fetchToDos().then( function( todos ) {
      // Highly fashioned filter function code ...
      return filteredToDos;
   });
}

export function filterAndSortToDos( filterString, sortOrder ) {
   return fetchToDos( filterString ).then( function( filteredToDos ) { 
      // Higly fashioned sort function
      return filteredAndSortedToDos;
   });
}
```

### Test Code
In your test you can mock your API-calls to simply return static dummy data like this
```js
import { filterToDos, filterAndSortToDos, __RewireAPI__ as ToDosRewireAPI } from 'TodoOperations.js';

describe('api call mocking', function() {
   it('should use the mocked api function', function(done) {
      ToDosRewireAPI.__Rewire__('fetchToDos', function() {
         return Promise.resolve(['Test more', 'Refine your tests', 'Tests first rocks']);
      });
      filterToDos('Test').then(function(filteredTodos) {
         //check results
         done();
      }).catch((e) => fail());
      ToDosRewireAPI.__ResetDependency__('fetchToDos');
   });
   
   it('should use the mocked filter function', function(done) {
      ToDosRewireAPI.__Rewire__('filterToDos', function() {
         return Promise.resolve( ['02 Test more', '01 Test even more' ] );
      });
      filterAndSortToDos('Test', 'asc').then(function(filteredAndSortedTodos) {
         //check results
         done();
      }).catch((e) => fail());
      ToDosRewireAPI.__ResetDependency__('filterToDos');
   });
});
```

## Handling of default exports

If a non primitive default export is present in the imported module, it is enriched with the API-Functions and the API-Object.
If no default export is present, the API-Object named `__RewireAPI__` becomes the default export of the module.

This object basically supports all the rewire API-Functions as described in the introduction above and allows one to rewire the module without explicitly importing the module itself.

### Example
Asuming your imported module does not have a default export specified like in this simple example
```js
function message() {
   return 'Hello world';
}

export function foo() {
   return message();
}
```

### Test Code
In your test you would use the default exported API-Object to rewire the function `message` of the imported module like this
```js
import FooModule from 'foo.js';
import { foo, __RewireAPI__ as FooModuleRewireAPI } from 'foo.js';

describe('module default export test', function() {
   it('should demonstrate the default exported rewire api', function() {
      expect( foo() ).to.equal('Hello world');
      FooModule.__Rewire__('message', function() {
         return 'my message';
      });
      expect( foo() ).to.equal('my message');
      FooModule.__ResetDependency__('message');
   });
   
   it('should demonstrate the rewire apis named export', function() {
      expect( foo() ).to.equal('Hello world');
      FooModuleRewireAPI.__Rewire__('message', function() {
         return 'my message';
      });
      expect( foo() ).to.equal('my message');
      FooModuleRewireAPI.__ResetDependency__('message');
   });
});
```

## Handling of async functions

Rewiring of async functions works as one would expect using the same API as for other rewires for both default exports and named exports.

### Example
Assuming your imported module consists of the following.
```js
// api.js
export default async function asyncApiDefault() {
   return await asyncApi();
};

export async function asyncApi() {
   return await api();
};

function api() {
  // Some async API call
  return Promise.resolve('API Response');
};
```

### Test Code
In your test you would use the default exported API-Object to rewire the function `asyncApiDefault` and `asyncApi` of the imported module like this.
```js
import { default as asyncApiDefault, asyncApi,  __RewireAPI__ as AsyncApiRewireAPI } from 'api.js';
describe('async function export test', function() {
 it('should be able to rewire default async function', function() {
    return asyncApiDefault().then(response => {
      expect(response).to.equal('API Response');

      AsyncApiRewireAPI.__set__('asyncApi', function() {
        return Promise.resolve('Mock API Response');
      });

      return asyncApiDefault().then(response => {
        expect(response).to.equal('Mock API Response');
        AsyncApiRewireAPI.__ResetDependency__('asyncApi');
      });
    });
  });

  it('should be able to rewire non default async function', function() {
    return asyncApi().then(response => {
      expect(response).to.equal('API Response');

      AsyncApiRewireAPI.__set__('api', function() {
        return Promise.resolve('Mock API Response');
      });

      return asyncApi().then(response => {
        expect(response).to.equal('Mock API Response');
        AsyncApiRewireAPI.__ResetDependency__('api');
      });
    });
  });
});
```

## Installation

```
$ npm install babel babel-plugin-rewire
```

## Usage

To use the plugin identify it by its long name "babel-plugin-rewire" or by its abbreviation "rewire". In case you are using rewire.js in the same project you must use the unabbreviated plugin name. Otherwise babel is trying to load rewire.js as a plugin which will cause an [error](https://github.com/speedskater/babel-plugin-rewire/issues/5).

###Commandline
abbreviated:
```
$ babel --plugins rewire ..
```
full plugin name:
```
$ babel --plugins babel-plugin-rewire ..
```

### JavaScript API

abbreviated:
```javascript
require("babel").transform("code", { plugins: ["rewire"] });
```
full plugin name:
```javascript
require("babel").transform("code", { plugins: ["babel-plugin-rewire"] });
```

### Webpack

abbreviated:
```javascript
{test: /src\/js\/.+\.js$/, loader: 'babel-loader?plugins=rewire' }
```
full plugin name:
```javascript
{test: /src\/js\/.+\.js$/, loader: 'babel-loader?plugins=babel-plugin-rewire' }
```

### Browserify/Babelify

full plugin name:
```javascript
var appBundler = browserify({
    entries: [test.src], // Only need initial file, browserify finds the rest
}).transform(
    babelify.configure({
        plugins: [require('babel-plugin-rewire')]
    })
);
```

## Combining with other plugins/tools

### [isparta](https://github.com/douglasduteil/isparta) 
There are some things to consider when using babel-plugin-rewire together with isparta. Since isparta runs Babel itself it's important to remember to add the same configuration options to it as you would do with Babel. If you forget this you will in some cases see unexpected errors.

If you use _.babelrc_ it's advised that you run your tests with a specific ENV, for example "test", and add the following to your _.babelrc_.

```json
"env": {
  "test": {
    "plugins": ["rewire"]
  }
}
```

If you are using isparta together with Webpack you could also do something like this.
```javascript
loader: 'isparta?{ babel: { plugins: ["rewire"] } }'
```

## Release History

* 0.1.0 Initial release
* 0.1.1 Bugfix: moved to peer dependencies
* 0.1.2 Added \_\_set\_\_ and \_\_get\_\_ to provide compatibility with rewire.js
* 0.1.3 Added handling for the export of named declarations like classes or functions
* 0.1.4 Fixed variable handling and used renaming of scope variables. Further removed global identifiers to prevent memory leaks.
* 0.1.5 Fixed regression
* 0.1.6 Support for rewiring top level variables. Added module.exports for non-es6 modules.
* 0.1.7 Fixed regressions from 0.1.6.
* 0.1.8 Ignores destructuring assignments to prevent errors.
* 0.1.9 Removed issues with TDZ and es6.spec.blockScoping optional transformer.
* 0.1.10 Fixed tests.
* 0.1.11 Fixed issues with for-of loops.
* 0.1.12 Updated Plugin Format.
* 0.1.13 Changed rewire specific properties on default export to non-enumerable properties.
* 0.1.14 Added handling for non-enumerable properties to commonjs support. Support for mixed es6 and commonjs support. Handling for primitive types.
* 0.1.15 Added functionality to rewire functions. 
* 0.1.16 Fixed variable scope for rewired functions.
* 0.1.17 Fixed variable scoping for var variable declarations.
* 0.1.18 Fixed function scope for rewired functions.
* 0.1.19 Removed debug statements.
* 0.1.20 Added rewiring named exported functions and variables.
* 0.1.21 Improved default export handling, fixed commonjs default exporting, fixed ast nodes resource leaks, improved README. 
* 0.1.22 Added support for asynchronous functions

## Contributors

[speedskater](https://github.com/speedskater) - author and creator of initial release
[Peet](https://github.com/peet) - module.exports and top-level var support
[TheSavior](https://github.com/TheSavior) - support for non-enumerable rewire properties
[PSpSynedra](https://github.com/PSpSynedra) - support for named export and function rewiring and improvements of default imports 
[Gustaf Dalemar](https://github.com/DLMR) - support for asynchronous functions

## License

The ISC License (ISC)

Copyright (c) 2015, Robert Binna <r.binna@synedra.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
