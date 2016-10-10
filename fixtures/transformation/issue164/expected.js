function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new (_get__("Promise"))(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _get__("Promise").resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import fs from "./promisified/fs";
import sortBy from "lodash/sortBy";
import Promise from "bluebird";
import { Glob } from "glob";
import FileOptionsProvider from "./FileOptionsProvider";

const DEFAULT_GLOB_OPTIONS = {
	dot: true,
	nodir: true,
	nosort: true // Sorting is gonna be done anyway
};

/**
 * @this FileProvider
 * @private
 */
function createTuple(base, relative) {
	let options = this._fileOptionsProvider.getOptions(relative);
	if (!options) {
		return;
	}

	let file = {};

	if (options.priority) {
		file.priority = options.priority;
	}

	file.src = { base, relative };

	return [file, options];
}

/**
 * Sort tuples by priority first and then by src relative path.
 *
 * @this FileProvider
 * @private
 */
function sortTuples(tuples) {
	return _get__("sortBy")(tuples, tuple => (tuple[0].priority || 0) * -1, tuple => tuple[0].relative);
}

export default class FileProvider {

	constructor(options) {
		this._fileOptionsProvider = new (_get__("FileOptionsProvider"))(options);
	}

	/**
  * Get sorted file/options tuples from a given directory.
  *
  * @param baseDir Path of the directory from where to list source files.
  * @returns Sorted array of file/options tuples.
  */
	getSorted(baseDir) {
		var _this = this;

		return _asyncToGenerator(function* () {
			let self = _this;

			let absoluteBaseDir = yield _get__("fs").realpathAsync(baseDir);
			let globOptions = Object.assign(_get__("DEFAULT_GLOB_OPTIONS"), {
				cwd: absoluteBaseDir
			});

			let tuples = [];

			yield _get__("Promise").fromCallback(function (callback) {
				new (_get__("Glob"))("**", globOptions, callback).on("match", function (match) {
					let tuple = _get__("createTuple").call(self, absoluteBaseDir, match);
					if (tuple) {
						tuples.push(tuple);
					}
				});
			});

			return _get__("sortTuples")(tuples);
		})();
	}
}

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
let _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _get_original__(variableName);
	} else {
		var value = _RewiredData__[variableName];

		if (value === INTENTIONAL_UNDEFINED) {
			return undefined;
		} else {
			return value;
		}
	}
}

function _get_original__(variableName) {
	switch (variableName) {
		case "sortBy":
			return sortBy;

		case "FileOptionsProvider":
			return FileOptionsProvider;

		case "fs":
			return fs;

		case "DEFAULT_GLOB_OPTIONS":
			return DEFAULT_GLOB_OPTIONS;

		case "Promise":
			return Promise;

		case "Glob":
			return Glob;

		case "createTuple":
			return createTuple;

		case "sortTuples":
			return sortTuples;
	}

	return undefined;
}

function _assign__(variableName, value) {
	if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return _RewiredData__[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	if (typeof variableName === 'object') {
		Object.keys(variableName).forEach(function (name) {
			_RewiredData__[name] = variableName[name];
		});
	} else {
		if (value === undefined) {
			_RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
		} else {
			_RewiredData__[variableName] = value;
		}

		return function () {
			_reset__(variableName);
		};
	}
}

function _reset__(variableName) {
	delete _RewiredData__[variableName];
}

function _with__(object) {
	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			_RewiredData__[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = _RewiredData__[variableName];
			_RewiredData__[variableName] = object[variableName];
		});
		let result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

let _typeOfOriginalExport = typeof FileProvider;

function addNonEnumerableProperty(name, value) {
	Object.defineProperty(FileProvider, name, {
		value: value,
		enumerable: false,
		configurable: true
	});
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(FileProvider)) {
	addNonEnumerableProperty('__get__', _get__);
	addNonEnumerableProperty('__GetDependency__', _get__);
	addNonEnumerableProperty('__Rewire__', _set__);
	addNonEnumerableProperty('__set__', _set__);
	addNonEnumerableProperty('__reset__', _reset__);
	addNonEnumerableProperty('__ResetDependency__', _reset__);
	addNonEnumerableProperty('__with__', _with__);
	addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };