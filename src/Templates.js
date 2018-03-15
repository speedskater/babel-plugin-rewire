/*Copyright (c) 2015, Robert Binna <r.binna@synedra.com>

 Permission to use, copy, modify, and/or distribute this software for any
 purpose with or without fee is hereby granted, provided that the above
 copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.*/

import template from 'babel-template';

export const universalAccesorsTemplate = template(`
function GET_GLOBAL_VARIABLE_HANDLE_IDENTIFIER() {
	try {
			if(!!global) {
					return global;
			}
	} catch(e) {
			try {
					if(!!window) {
							return window;
					}
			} catch(e) {
					return this;
			}
	}
};

var UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER = null;
function GET_UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER() {
	if(UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER === null) {
		let globalVariable = GET_GLOBAL_VARIABLE_HANDLE_IDENTIFIER();
		if(!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
			globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
		}
		UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
	}
	return UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER;
}

function GET_REWIRE_REGISTRY_IDENTIFIER() {
	let theGlobalVariable = GET_GLOBAL_VARIABLE_HANDLE_IDENTIFIER();
	if(!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
		theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
	}
	return __$$GLOBAL_REWIRE_REGISTRY__; 
}

function GET_REWIRE_DATA_IDENTIFIER() {
	let moduleId = GET_UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER();
	let registry = GET_REWIRE_REGISTRY_IDENTIFIER();
	let rewireData = registry[moduleId];
	if(!rewireData) {
		registry[moduleId] = Object.create(null);
		rewireData = registry[moduleId];
	}
	return rewireData;
}

(function registerResetAll() {
	let theGlobalVariable = GET_GLOBAL_VARIABLE_HANDLE_IDENTIFIER();
	if(!theGlobalVariable['__rewire_reset_all__']) {
		theGlobalVariable['__rewire_reset_all__'] = function() {
			theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
		};
	}
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';

let API_OBJECT_ID = {};

(function() {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(API_OBJECT_ID, name, { value: value, enumerable: false, configurable: true });
	}

	addPropertyToAPIObject('__get__', UNIVERSAL_GETTER_ID);
	addPropertyToAPIObject('__GetDependency__', UNIVERSAL_GETTER_ID);
	addPropertyToAPIObject('__Rewire__', UNIVERSAL_SETTER_ID);
	addPropertyToAPIObject('__set__', UNIVERSAL_SETTER_ID);
	addPropertyToAPIObject('__reset__', UNIVERSAL_RESETTER_ID);
	addPropertyToAPIObject('__ResetDependency__', UNIVERSAL_RESETTER_ID);
	addPropertyToAPIObject('__with__', UNIVERSAL_WITH_ID);
})();

function UNIVERSAL_GETTER_ID(variableName) {
	let rewireData = GET_REWIRE_DATA_IDENTIFIER();
  if (rewireData[variableName] === undefined) {
    return ORIGINAL_VARIABLE_ACCESSOR_IDENTIFIER(variableName);
  } else {
    var value = rewireData[variableName];
    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

ORIGINAL_ACCESSOR

function ASSIGNMENT_OPERATION_IDENTIFIER(variableName, value) {
	let rewireData = GET_REWIRE_DATA_IDENTIFIER();
	if(rewireData[variableName] === undefined) {
		return ORIGINAL_VARIABLE_SETTER_IDENTIFIER(variableName, value);
	} else {
		return rewireData[variableName] = value;
	}
}

ORIGINAL_SETTER;

function UPDATE_OPERATION_IDENTIFIER(operation, variableName, prefix) {
	var oldValue = UNIVERSAL_GETTER_ID(variableName);
	var newValue = (operation === '++') ? oldValue + 1 : oldValue - 1;
	ASSIGNMENT_OPERATION_IDENTIFIER(variableName, newValue);
	return (prefix) ? newValue : oldValue;
}

function UNIVERSAL_SETTER_ID(variableName, value) {
	let rewireData = GET_REWIRE_DATA_IDENTIFIER();
	if(typeof variableName === 'object') {
		Object.keys(variableName).forEach(function(name) {
			rewireData[name] = variableName[name];
		});
	} else {
	    if (value === undefined) {
	      rewireData[variableName] = INTENTIONAL_UNDEFINED
	    } else {
	      rewireData[variableName] = value
	    }

        return function() {
            UNIVERSAL_RESETTER_ID(variableName);
        };
	}
}

function UNIVERSAL_RESETTER_ID(variableName) {
	let rewireData = GET_REWIRE_DATA_IDENTIFIER();
	delete rewireData[variableName];
	if(Object.keys(rewireData).length == 0) {
		delete GET_REWIRE_REGISTRY_IDENTIFIER()[GET_UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER];
	};
}

function UNIVERSAL_WITH_ID(object) {
	let rewireData = GET_REWIRE_DATA_IDENTIFIER();
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function(variableName) {
			rewireData[variableName] = previousValues[variableName];
		});
	}

	return function(callback) {
		rewiredVariableNames.forEach(function(variableName) {
			previousValues[variableName] = rewireData[variableName];
			rewireData[variableName] = object[variableName];
		});
		let result = callback();
		if(!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}
		return result;
	}
}


`);

export const enrichExportTemplate = template(`
let TYPEOFORIGINALEXPORTVARIABLE = typeof EXPORT_VALUE;
function addNonEnumerableProperty(name, value) {
	Object.defineProperty(EXPORT_VALUE, name, { value: value, enumerable: false, configurable: true });
}

if((TYPEOFORIGINALEXPORTVARIABLE === 'object' || TYPEOFORIGINALEXPORTVARIABLE === 'function') && Object.isExtensible(EXPORT_VALUE)) {
	addNonEnumerableProperty('__get__', UNIVERSAL_GETTER_ID);
	addNonEnumerableProperty('__GetDependency__', UNIVERSAL_GETTER_ID);
	addNonEnumerableProperty('__Rewire__', UNIVERSAL_SETTER_ID);
	addNonEnumerableProperty('__set__', UNIVERSAL_SETTER_ID);
	addNonEnumerableProperty('__reset__', UNIVERSAL_RESETTER_ID);
	addNonEnumerableProperty('__ResetDependency__', UNIVERSAL_RESETTER_ID);
	addNonEnumerableProperty('__with__', UNIVERSAL_WITH_ID);
	addNonEnumerableProperty('__RewireAPI__', API_OBJECT_ID);
}
`);

export const filterWildcardImportTemplate = template(`
function FILTER_WILDCARD_IMPORT_IDENTIFIER(wildcardImport={}) {
	let validPropertyNames = Object.keys(wildcardImport).filter(function(propertyName) {
		return  propertyName !== '__get__' &&
				propertyName !== '__set__' &&
				propertyName !== '__reset__' &&
				propertyName !== '__with__' &&

				propertyName !== '__GetDependency__' &&
				propertyName !== '__Rewire__' &&
				propertyName !== '__ResetDependency__' &&

				propertyName !== '__RewireAPI__';
	});

	return validPropertyNames.reduce(
		function(filteredWildcardImport, propertyName) {
			filteredWildcardImport[propertyName] = wildcardImport[propertyName];
			return filteredWildcardImport;
		}, {}
	);
}
`);
