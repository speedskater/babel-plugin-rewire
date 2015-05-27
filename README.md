# babel-plugin-rewire

A Babel plugin that adds the ability to rewire module dependencies.

[![Build Status](https://travis-ci.org/speedskater/babel-plugin-rewire.svg)](https://travis-ci.org/speedskater/babel-plugin-rewire)

It is inspired by [rewire.js](https://github.com/jhnns/rewire) and transfers its concepts to es6 using babel.

It is useful for writing tests, specifically to mock the dependencies of the module under test.

Therefore for each module it adds and exports the methods \_\_GetDependency\_\_, \_\_Rewire\_\_, and \_\_ResetDependency\_\_.
These methods allow to rewire the module under test.
Furthermore in case of a default export these methods are assigned to the existing default export. For compatibility reasons with rewire.js, the methods \_\_get\_\_ and \_\_set\_\_ are assigned to the default export as well.

##Example
###React Component

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

## Release History

* 0.1.0 Initial release
* 0.1.1 Bugfix: moved to peer dependencies
* 0.1.2 Added \_\_set\_\_ and \_\_get\_\_ to provide compatibility with rewire.js
* 0.1.3 Added handling for the export of named declarations like classes or functions

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
