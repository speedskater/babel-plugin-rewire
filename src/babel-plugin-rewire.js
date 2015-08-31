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

var Transformer = require("babel-core").Transformer;
var t           = require("babel-core").types;

var isES6Module;
var hasES6Export;
var hasES6DefaultExport;
var hasCommonJSExport;

module.exports = function(pluginArguments) {
	var Plugin = pluginArguments.Plugin;
	var t = pluginArguments.types;
	return new Plugin("rewire", {
		visitor: {
			Program: (function () {
				function getUniversalGetterID() {
					return t.identifier('__GetDependency__');
				}

				function getUniversalSetterID() {
					return t.identifier('__Rewire__');
				}

				function getUniversalResetterID() {
					return t.identifier('__ResetDependency__');
				}

				function getAPIObjectID() {
					return t.identifier('__RewireAPI__');
				}

				return {
					enter: function (node) {
						var universalGetter = t.functionDeclaration(
							noRewire(getUniversalGetterID()),
							[t.identifier("name")],
							t.blockStatement([
								t.returnStatement(t.callExpression(t.memberExpression(t.identifier("__$Getters__"), t.identifier("name"), true), []))
							])
						);

						var universalSetter = t.functionDeclaration(
							noRewire(getUniversalSetterID()),
							[t.identifier("name"), t.identifier("value")],
							t.blockStatement([
								t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("__$Setters__"), t.identifier("name"), true), [t.identifier("value")]))
							])
						);

						var universalResetter = t.functionDeclaration(
							noRewire( getUniversalResetterID()),
							[t.identifier("name")],
							t.blockStatement([
								t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("__$Resetters__"), t.identifier("name"), true), []))
							])
						);

						var rewireAPIObject = t.variableDeclaration('let', [
							t.variableDeclarator(noRewire(getAPIObjectID()), t.objectExpression([
								t.property('init', t.literal(universalGetter.id.name), universalGetter.id),
								t.property('init', t.literal('__get__'), universalGetter.id),
								t.property('init', t.literal(universalSetter.id.name), universalSetter.id),
								t.property('init', t.literal('__set__'), universalSetter.id),
								t.property('init', t.literal(universalResetter.id.name), universalResetter.id)
							]))
						]);

						isES6Module = false;
						hasES6DefaultExport = false;
						hasES6Export = false;
						hasCommonJSExport = false;
						var gettersArrayDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier("__$Getters__")), t.arrayExpression([]))]);
						var settersArrayDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier("__$Setters__")), t.arrayExpression([]))]);
						var resettersArrayDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier("__$Resetters__")), t.arrayExpression([]))]);

						node.body.unshift(gettersArrayDeclaration, settersArrayDeclaration, resettersArrayDeclaration, universalGetter,
							universalSetter, universalResetter, rewireAPIObject);

						return node;
					},
					exit: function (node, parent, scope, file) {

						var exports;

						var functionReplacementVariables = [];
						var remainingBodyElements = [];

						node.body.forEach(function(bodyElement) {
							if(bodyElement.type == 'VariableDeclaration' && bodyElement.declarations.length === 1 &&
								!!bodyElement.declarations[0].id && bodyElement.declarations[0].id.functionIdentifier === true) {
								functionReplacementVariables.push(bodyElement);
							} else {
								remainingBodyElements.push(bodyElement);
							}
						});

						if (isES6Module && (!hasCommonJSExport || hasES6Export)) {
							exports = [
								t.exportNamedDeclaration(null, [
									t.exportSpecifier(getUniversalGetterID(), getUniversalGetterID()),
									t.exportSpecifier(getUniversalGetterID(), t.identifier('__get__')),
									t.exportSpecifier(getUniversalSetterID(), getUniversalSetterID()),
									t.exportSpecifier(getUniversalSetterID(), t.identifier('__set__')),
									t.exportSpecifier(getUniversalResetterID(), getUniversalResetterID()),
									t.exportSpecifier(getAPIObjectID(), getAPIObjectID())
								])
							];

							if(!hasES6DefaultExport) {
								exports.push(t.exportDefaultDeclaration(getAPIObjectID()));
							}
						}
						else if(!isES6Module || (!hasES6Export && hasCommonJSExport)) {
							var moduleExports = t.memberExpression(t.identifier('module'), t.identifier('exports'), false);

							nonEnumerableExports = [
								addNonEnumerableProperty(t, moduleExports, '__Rewire__', getUniversalSetterID()),
								addNonEnumerableProperty(t, moduleExports, '__set__', getUniversalSetterID()),
								addNonEnumerableProperty(t, moduleExports, '__ResetDependency__', getUniversalResetterID()),
								addNonEnumerableProperty(t, moduleExports, '__GetDependency__', getUniversalGetterID()),
								addNonEnumerableProperty(t, moduleExports, '__get__', getUniversalGetterID()),
								addNonEnumerableProperty(t, moduleExports, '__RewireAPI__', getAPIObjectID())
							];

							exports = [ t.ifStatement(
								t.logicalExpression('||',
									t.binaryExpression('===', t.unaryExpression('typeof', moduleExports, true), t.literal('object')),
									t.binaryExpression('===', t.unaryExpression('typeof', moduleExports, true), t.literal('function'))
								),
								t.blockStatement(nonEnumerableExports)
							)];
						}
						node.body = functionReplacementVariables.concat(remainingBodyElements).concat(exports);
						return node;
					}
				}
			})(),

			ExpressionStatement: function(node, parent, scope) {
				if(parent.sourceType === 'module' && !!node.expression && node.expression.type === 'AssignmentExpression') {
					var assignmentExpression = node.expression;

					if(!!assignmentExpression.left.object && assignmentExpression.left.object.name === 'module' && !!assignmentExpression.left.property && assignmentExpression.left.property.name === 'exports') {
						hasCommonJSExport = true;
					}
				}
				return node;

			},

			VariableDeclaration: function (node, parent, scope) {
				var variableDeclarations = [];
				var accessors = [];

				if(parent.type === 'ExportNamedDeclaration' || parent.sourceType === 'module') {
					node.declarations.forEach(function (declaration) {
						if (!declaration.id.__noRewire && declaration.init && !!declaration.id.name) {
							var variableName = noRewire(declaration.id).name;
							var existingBinding = scope.bindings[variableName];
							var bindingType = node.kind === 'var' ? 'var' : 'let';

							if (!!existingBinding) {
								if (existingBinding.kind === 'var') {
									bindingType = 'var';
								} else {
									existingBinding.kind = 'let';
								}
							}
							node.kind = bindingType;

							var originalVar = noRewire(scope.generateUidIdentifier(variableName));

							variableDeclarations.push(t.variableDeclaration(bindingType, [t.variableDeclarator(originalVar, t.identifier(variableName))]));

							accessors.push.apply(accessors, accessorsFor(variableName, originalVar));
						}
					});
				}

				if(parent.type === 'ExportNamedDeclaration') {
					var exportDeclarations = node.declarations.map(function(variableDeclaration, index) {
						var exportId = variableDeclarations[index].declarations[0].id;
						return t.exportNamedDeclaration(null, [t.exportSpecifier(exportId, variableDeclaration.id)]);
					});
					this.parentPath.replaceWithMultiple([ node].concat(variableDeclarations).concat(accessors).concat(exportDeclarations));
				} else {
					return variableDeclarations.length == 0 ? node : [node].concat(variableDeclarations).concat(accessors);
				}
			},

			/**
			 * Functions are replaced by a temporary function declaration and an assignment to a variable with the same name as the original function
			 * The actual rewireing functionality is added by The Handler for VariableDeclarations which creates a temporary variable and accessors for setting resetting the function.
			 */
			FunctionDeclaration: function(declaration, parent, scope) {
				if((parent.type !== 'ExportNamedDeclaration' && parent.sourceType !== 'module') || declaration.id.__noRewire || !declaration.id.name || declaration.id.name.length == 0) {
					return declaration;
				}

				var replacedFunctionDeclarationIdentifier = noRewire(scope.generateUidIdentifier(declaration.id.name + 'Orig'));
				var originalFunctionIdentifier = declaration.id;
				originalFunctionIdentifier.functionIdentifier = true;
				var replacedFunctionDeclaration = t.functionDeclaration(replacedFunctionDeclarationIdentifier, declaration.params, declaration.body, declaration.generator, declaration.async, declaration.expression);

				var newFuntionDeclaration = [replacedFunctionDeclaration, t.variableDeclaration('var', [t.variableDeclarator(originalFunctionIdentifier, replacedFunctionDeclarationIdentifier)])];

				if(parent.type === 'ExportNamedDeclaration') {
					var exportSpecifier = [t.exportNamedDeclaration(null, [ t.exportSpecifier(replacedFunctionDeclarationIdentifier, originalFunctionIdentifier) ] )];
					this.parentPath.replaceWithMultiple(newFuntionDeclaration.concat(exportSpecifier));
				} else {
					return newFuntionDeclaration;
				}
			},

			ImportDeclaration: function (node, parent, scope, file) {
				isES6Module = true;
				var variableDeclarations = [];
				var accessors = [];

				node.specifiers.forEach(function (specifier) {
					var importedSpecifierName = (specifier.imported && specifier.imported.name) || null;
					var localVariable = specifier.local;
					var localVariableName = localVariable.name;

					var actualImport = scope.generateUidIdentifier(localVariableName + "Temp");
					scope.bindings[localVariableName].constant = false;
					scope.bindings[localVariableName].kind = 'let';

					//scope.rename(localVariableName, actualImport.name);

					if (importedSpecifierName === localVariableName) {
						specifier.imported = t.identifier(importedSpecifierName);
					}
					specifier.local = actualImport;

					variableDeclarations.push(t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier(localVariableName)), actualImport)]));

					accessors.push.apply(accessors, accessorsFor(localVariableName, actualImport));
				});

				return [node].concat(variableDeclarations).concat(accessors);
			},

			'ExportNamedDeclaration|ExportAllDeclaration': {
				enter: function (node) {
					isES6Module = true;
					return node;
				},
				exit: function(node) {
					return node;
				}
			},

			ExportDefaultDeclaration: function (node, parent, scope) {
				if(!!node.rewired) {
					return node;
				}
				hasES6DefaultExport = true;
				hasES6Export = true;
				isES6Module = true;
				var originalExport = node.declaration;
				if (!!node.declaration.id) {
					this.insertBefore(node.declaration);
					originalExport = node.declaration.id;
				}

				var bindingType = node.declaration.type === 'FunctionDeclaration' || node.declaration.kind === 'var' ? 'var' : 'let';

				var defaultExportVariableId = scope.generateUidIdentifier("defaultExport");

				var defaultExportVariableDeclaration = t.variableDeclaration(bindingType, [t.variableDeclarator(noRewire(defaultExportVariableId), originalExport)]);

				t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('defineProperty'), [ defaultExportVariableId, '__Rewire__',  t.objectExpression([
					t.property('init', t.literal('value'), t.identifier('__Rewire__'))
				])]));

				var addAdditionalProperties = t.ifStatement(
					t.logicalExpression('||',
						t.binaryExpression('===', t.unaryExpression('typeof', defaultExportVariableId, true), t.literal('object')),
						t.binaryExpression('===', t.unaryExpression('typeof', defaultExportVariableId, true), t.literal('function'))
					),
					t.blockStatement([
						addNonEnumerableProperty(t, defaultExportVariableId, '__Rewire__', t.identifier('__Rewire__')),
						addNonEnumerableProperty(t, defaultExportVariableId, '__set__', t.identifier('__Rewire__')),
						addNonEnumerableProperty(t, defaultExportVariableId, '__ResetDependency__', t.identifier('__ResetDependency__')),
						addNonEnumerableProperty(t, defaultExportVariableId, '__GetDependency__', t.identifier('__GetDependency__')),
						addNonEnumerableProperty(t, defaultExportVariableId, '__get__', t.identifier('__GetDependency__')),
						addNonEnumerableProperty(t, defaultExportVariableId, '__RewireAPI__', t.identifier('__RewireAPI__'))
					])
				);

				var defaultExport = t.exportDefaultDeclaration(defaultExportVariableId);

				defaultExport.rewired = true;

				return [defaultExportVariableDeclaration, addAdditionalProperties, defaultExport];
			}
		}
	});
}

function addNonEnumerableProperty(t, objectIdentifier, propertyName, valueIdentifier) {
	return t.expressionStatement(t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('defineProperty')), [ objectIdentifier, t.literal(propertyName),  t.objectExpression([
		t.property('init', t.literal('value'), valueIdentifier),
		t.property('init', t.literal('enumberable'), t.literal(false))
	])]));
}

function accessorsFor(variableName, originalVar) {
	var accessor = function(array, variableName, operation) {
		return t.expressionStatement(t.assignmentExpression("=", t.memberExpression(array, t.literal(variableName), true), operation));
	};

	var getter = noRewire(t.functionDeclaration(
			getter,
			[],
			t.blockStatement([
				t.returnStatement(t.identifier(variableName))
			])
	));

	var setter = t.functionDeclaration(
			null,
			[t.identifier("value")],
			t.blockStatement([
				t.expressionStatement(t.assignmentExpression("=", t.identifier(variableName), t.identifier("value")))
			])
	);

	var resetter = t.functionDeclaration(
			null,
			[],
			t.blockStatement([
				t.expressionStatement(t.assignmentExpression("=", t.identifier(variableName), originalVar))
			])
	);

	return [
		accessor(t.identifier("__$Getters__"), variableName, getter),
		accessor(t.identifier("__$Setters__"), variableName, setter),
		accessor(t.identifier("__$Resetters__"), variableName, resetter)
	];
}

function noRewire(identifier) {
	identifier.__noRewire = true;
	return identifier;
}
