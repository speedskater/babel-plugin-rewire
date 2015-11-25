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

var template = require("babel-template");

const getterTemplate = template(`
	function GETTER_NAME() {
		return (REWIRED_DATA_IDENTIFIER === undefined || REWIRED_DATA_IDENTIFIER[VARIABLENAME] === undefined) ? VARIABLE : REWIRED_DATA_IDENTIFIER[VARIABLENAME];
	}
`);

const universalAccesorsTemplate = template(`
let REWIRED_DATA_IDENTIFIER = {};
let GETTERS_IDENTIFIER = ALL_GETTERS;

function UNIVERSAL_GETTER_ID(variableName) {
	return GETTERS_IDENTIFIER[variableName]();
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
			REWIRED_DATA[variableName] = previousValues[variableName];
		});
	}

	return function(callback) {
		rewiredVariableNames.forEach(function(variableName) {
			previousValues[variableName] = REWIRED_DATA[variableName];
			REWIRED_DATA[variableName] = object[variableName];
		});
		let result = callback();
		if(typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}
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
	addPropertyToAPIObject('__ResetDependency__', UNIVERSAL_RESETTER_ID);
	addPropertyToAPIObject('__with__', UNIVERSAL_WITH_ID);
})();
`);

function appendUniversalAccessors(rewireInformation, scope, t) {
	rewireInformation.appendToProgramBody(universalAccesorsTemplate({
		GETTERS_IDENTIFIER: noRewire(scope.generateUidIdentifier('__GETTERS__')),
		ALL_GETTERS: t.objectExpression(Object.keys(rewireInformation.accessors).map(function(variableName) {
			return t.objectProperty(t.stringLiteral(variableName), rewireInformation.accessors[variableName], false);
		})),
		UNIVERSAL_GETTER_ID :rewireInformation.getUniversalGetterID(),
		UNIVERSAL_SETTER_ID :rewireInformation.getUniversalSetterID(),
		UNIVERSAL_RESETTER_ID :rewireInformation.getUniversalResetterID(),
		UNIVERSAL_WITH_ID :rewireInformation.getUniversalWithID(),
		API_OBJECT_ID: rewireInformation.getAPIObjectID(),
		REWIRED_DATA_IDENTIFIER: rewireInformation.rewiredDataIdentifier
	}));
}

const es6ExportsTemplate = template(`
export let __get__ = UNIVERSAL_GETTER_ID;
`);
/*
 export {
 UNIVERSAL_GETTER_ID as __get__,
 UNIVERSAL_GETTER_ID as __GetDependency__,
 UNIVERSAL_SETTER_ID as __set__,
 UNIVERSAL_SETTER_ID as __Rewire__,
 UNIVERSAL_RESETTER_ID as __reset__,
 UNIVERSAL_RESETTER_ID as __ResetDependency__,
 UNIVERSAL_WITH_ID as __with__,
 API_OBJECT_ID as __RewireAPI__
 };
 */

function getExportTemplateParameter(rewireInformation) {
	return {
		UNIVERSAL_GETTER_ID: rewireInformation.getUniversalGetterID(),
		UNIVERSAL_SETTER_ID: rewireInformation.getUniversalSetterID(),
		UNIVERSAL_RESETTER_ID: rewireInformation.getUniversalResetterID(),
		UNIVERSAL_WITH_ID: rewireInformation.getUniversalWithID(),
		API_OBJECT_ID: rewireInformation.getAPIObjectID()
	};
}

const enrichExportTemplate = template(`
let typeOfOriginalExport = typeof EXPORT_VALUE;
function addNonEnumerableProperty(name, value) {
	Object.defineProperty(EXPORT_VALUE, name, { value: value, enumerable: false, configurable: true });
}

if((typeOfOriginalExport === 'object' || typeOfOriginalExport === 'function') && Object.isExtensible(EXPORT_VALUE)) {
	addNonEnumerableProperty('__get__', UNIVERSAL_GETTER_ID);
	addNonEnumerableProperty('__GetDependency__', UNIVERSAL_GETTER_ID);
	addNonEnumerableProperty('__Rewire__', UNIVERSAL_SETTER_ID);
	addNonEnumerableProperty('__set__', UNIVERSAL_SETTER_ID);
	addNonEnumerableProperty('__ResetDependency__', UNIVERSAL_RESETTER_ID);
	addNonEnumerableProperty('__with__', UNIVERSAL_WITH_ID);
	addNonEnumerableProperty('__RewireAPI__', API_OBJECT_ID);
}
`);

/*
 export {
 UNIVERSAL_GETTER_ID as __get__,
 UNIVERSAL_GETTER_ID as __GetDependency__,
 UNIVERSAL_SETTER_ID as __set__,
 UNIVERSAL_SETTER_ID as __Rewire__,
 UNIVERSAL_RESETTER_ID as __reset__,
 UNIVERSAL_RESETTER_ID as __ResetDependency__,
 UNIVERSAL_WITH_ID as __with__,
 API_OBJECT_ID as __RewireAPI__
 };
 */

function generateNamedExports(rewireInformation, t) {
	return t.exportNamedDeclaration(null, [
		t.exportSpecifier(rewireInformation.getUniversalGetterID(), t.identifier('__get__')),
		t.exportSpecifier(rewireInformation.getUniversalGetterID(), t.identifier('__GetDependency__')),
		t.exportSpecifier(rewireInformation.getUniversalSetterID(), t.identifier('__Rewire__')),
		t.exportSpecifier(rewireInformation.getUniversalSetterID(), t.identifier('__set__')),
		t.exportSpecifier(rewireInformation.getUniversalResetterID(), t.identifier('__ResetDependency__')),
		t.exportSpecifier(rewireInformation.getAPIObjectID(), t.identifier('__RewireAPI__')),
	]);
	return es6ExportsTemplate(getExportTemplateParameter(rewireInformation));
}

function enrichExport(rewireInformation, exportValue) {
	var exportTemplateParameters = getExportTemplateParameter(rewireInformation);
	exportTemplateParameters.EXPORT_VALUE = exportValue;
	return enrichExportTemplate(exportTemplateParameters);
}

module.exports = function(pluginArguments) {
	var t = pluginArguments.types;

	var BodyVisitor = {
		Identifier: function (path, rewireInformation) {
			var node = path.node;
			var parent = path.parent;
			var variableName = path.node.name;
			var variableBinding = path.scope.getBinding(variableName);

			//Matches for body
			if (!wasProcessed(path)
				&& !(parent.type === 'AssignmentExpression' && parent.left == node)
				&& !(parent.type !== 'VariableDeclarator' && parent.id == node)
				&& !(parent.type === 'MemberExpression' && parent.property === node)
				&& !(parent.type === 'Property' && parent.key === node) //TODO maxbe duplicated
				&& !(parent.type === 'ObjectProperty' && parent.key === node)
				&& !(parent.type === 'ExportSpecifier')
				&& !(parent.type === 'ImportSpecifier')
				&& !(parent.type === 'ClassMethod')) {

				function referenceMatcher(referencPath) {
					return referencPath === path;
				}

				if (variableBinding === undefined ||
					(variableBinding.scope.block.type === 'Program' && variableBinding.referencePaths.find(referenceMatcher) !== undefined)) {
					path.replaceWith(t.callExpression(rewireInformation.ensureAccessor(rewireInformation, path, variableName), []));

					if(parent.type === 'ExportSpecifier') {
						console.log("----------------- ExportSpecifier ----------------- :: " + JSON.stringify(parent.exported));
					}

					console.log(variableName + ":" + ": " + JSON.stringify(path.node.loc) + ": global variable" + " parent type: " + path.parent.type);
				}
			}
		},

		'ExportNamedDeclaration|ExportAllDeclaration': function (path, rewireInformation) {
				rewireInformation.isES6Module = true;
		},

		AssignmentExpression: function(path, rewireInformation) {
			var assignmentExpression = path.node;
			rewireInformation.hasCommonJSExport = path.scope.block.type === 'Program' &&
				!!assignmentExpression.left.object && assignmentExpression.left.object.name === 'module' &&
				!!assignmentExpression.left.property && assignmentExpression.left.property.name === 'exports';
		},

		ExportDefaultDeclaration: function (path, rewireInformation) {
			if(!wasProcessed(path)) {
				var exportIdentifier

				rewireInformation.hasES6DefaultExport = true;
				rewireInformation.hasES6Export = true;
				rewireInformation.isES6Module = true;

				var originalDeclaration = path.node.declaration;
				if (originalDeclaration.type === 'ClassDeclaration' || originalDeclaration.type === 'FunctionDeclaration') {
					exportIdentifier = originalDeclaration.id;
					if(exportIdentifier === null) { //TODO clean up and generator new node instead of replacement
						exportIdentifier = originalDeclaration.id = path.scope.generateUidIdentifier("DefaultExportValue");
					}
					path.replaceWithMultiple([
						path.node.declaration,
						noRewire(t.exportDefaultDeclaration(exportIdentifier))
					]);
				} else {
					exportIdentifier =  noRewire(path.scope.generateUidIdentifier("DefaultExportValue"));
					path.replaceWithMultiple([
						t.variableDeclaration('let', [t.variableDeclarator(exportIdentifier, originalDeclaration)]),
						noRewire(t.exportDefaultDeclaration(exportIdentifier))
					]);
				}

				rewireInformation.appendToProgramBody(enrichExport(rewireInformation, exportIdentifier));
			}
		},

		ImportDeclaration: function (path, rewireInformation) {
			rewireInformation.isES6Module = true;
		}
	}

	function appendExports(rewireInformation, t) {
		if (rewireInformation.isES6Module && (!rewireInformation.hasCommonJSExport || rewireInformation.hasES6Export)) {
			rewireInformation.appendToProgramBody(generateNamedExports(rewireInformation, t));

			if(!rewireInformation.hasES6DefaultExport) {
				//TODO :: exports.push(t.exportDefaultDeclaration(rewireInformation.getAPIObjectID()));
			}
		}
		else if(!rewireInformation.isES6Module || (!rewireInformation.hasES6Export && rewireInformation.hasCommonJSExport)) {
			rewireInformation.appendToProgramBody(enrichExport(rewireInformation,  t.memberExpression(t.identifier('module'), t.identifier('exports'), false)));
		}
	}

	return {
		visitor: {
			Program: function(path, file) {
				if(!wasProcessed(path)) {
					var scope = path.scope;
					var rewireInformation = {
						isES6Module: false,
						hasES6Export: false,
						hasES6DefaultExport: false,
						nodesToAppendToProgramBody: [],
						hasCommonJSExport: false,
						accessors: {},
						rewiredDataIdentifier: scope.generateUidIdentifier("__RewiredData__"),

						universalAccessors: {
							__GetDependency__: scope.generateUidIdentifier("__GetDependency__"),
							__Rewire__: scope.generateUidIdentifier("__Rewire__"),
							__ResetDependency__: scope.generateUidIdentifier("__ResetDependency__"),
							__RewireAPI__: scope.generateUidIdentifier("__RewireAPI__"),
							__With__: scope.generateUidIdentifier("__with__")
						},

						appendToProgramBody: function(nodes) {
							if(!Array.isArray(nodes)) {
								console.log("NODES :: " + nodes);
								nodes = [ nodes ];
							}
							this.nodesToAppendToProgramBody = this.nodesToAppendToProgramBody.concat(nodes);
						},

						ensureAccessor: function(rewireInformation, path, variableName) {
							var accessors = this.accessors;
							if(!accessors[variableName]) {
								accessors[variableName] = noRewire(path.scope.generateUidIdentifier('get_' + variableName));
								this.appendToProgramBody(getterTemplate({
									GETTER_NAME: accessors[variableName],
									VARIABLENAME: t.stringLiteral(variableName),
									VARIABLE: t.identifier(variableName),
									REWIRED_DATA_IDENTIFIER: this.rewiredDataIdentifier
								}));
							}

							return accessors[variableName];
						},

						getUniversalGetterID: function () {
							return this.universalAccessors['__GetDependency__'];
						},

						getUniversalSetterID: function () {
							return this.universalAccessors['__Rewire__'];
						},

						getUniversalResetterID: function () {
							return this.universalAccessors['__ResetDependency__'];
						},

						getUniversalWithID: function () {
							return this.universalAccessors['__with__'];
						},

						getAPIObjectID: function () {
							return this.universalAccessors['__RewireAPI__'];
						}
					};

					var node = path.node;
					var parent = path.parent;
					var scope = path.scope;

					path.traverse(BodyVisitor, rewireInformation);

					appendUniversalAccessors(rewireInformation, path.scope, t);
					appendExports(rewireInformation, t);

					path.replaceWith(noRewire(t.Program(node.body.concat(rewireInformation.nodesToAppendToProgramBody), node.directives)));
				}
			}
		}
	};
};

function wasProcessed(path) {
	return path.node.__noRewire === true;
}

function noRewire(identifier) {
	identifier.__noRewire = true;
	return identifier;
}
