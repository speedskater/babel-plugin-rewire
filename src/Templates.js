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
let REWIRED_DATA_IDENTIFIER = {};

function UNIVERSAL_GETTER_ID(variableName) {
	return (REWIRED_DATA_IDENTIFIER === undefined || REWIRED_DATA_IDENTIFIER[variableName] === undefined) ? ORIGINAL_VARIABLE_ACCESSOR_IDENTIFIER(variableName) : REWIRED_DATA_IDENTIFIER[variableName];
}

ORIGINAL_ACCESSOR

function ASSIGNMENT_OPERATION_IDENTIFIER(variableName, value) {
	if(REWIRED_DATA_IDENTIFIER === undefined || REWIRED_DATA_IDENTIFIER[variableName] === undefined) {
		return ORIGINAL_VARIABLE_SETTER_IDENTIFIER(variableName, value);
	} else {
		return REWIRED_DATA_IDENTIFIER[variableName] = value;
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
	return REWIRED_DATA_IDENTIFIER[variableName] = value;
}

function UNIVERSAL_RESETTER_ID(variableName) {
	delete REWIRED_DATA_IDENTIFIER[variableName];
}

function UNIVERSAL_WITH_ID(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function(variableName) {
			REWIRED_DATA_IDENTIFIER[variableName] = previousValues[variableName];
		});
	}

	return function(callback) {
		rewiredVariableNames.forEach(function(variableName) {
			previousValues[variableName] = REWIRED_DATA_IDENTIFIER[variableName];
			REWIRED_DATA_IDENTIFIER[variableName] = object[variableName];
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
`);

export const enrichExportTemplate = template(`
let typeOfOriginalExport = typeof EXPORT_VALUE;
function addNonEnumerableProperty(name, value) {
	Object.defineProperty(EXPORT_VALUE, name, { value: value, enumerable: false, configurable: true });
}

if((typeOfOriginalExport === 'object' || typeOfOriginalExport === 'function') && Object.isExtensible(EXPORT_VALUE)) {
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
