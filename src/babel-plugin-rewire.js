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



module.exports = function(pluginArguments) {
	var t = pluginArguments.types;

	var ImportSpecifierVisitor = {
		ImportDefaultSpecifier: function(path, file) {
			if(!wasProcessed(path)) {

			}
		},

		ImportNamespaceSpecifier: function(path, file) {

		},

		ImportSpecifier: function(path, file) {

		}
	};

	var BodyVisitor = {
		VariableDeclaration: function(path, file) {
			//Matches for body
			if(path.parentPath.type === 'Program') {

			}
		},

		/*ImportDeclaration: function (path, file) {
			var node = path.node;
			var parent = path.parent;
			var scope = path.scope;

			isES6Module = true;
			var variableDeclarations = [];
			var accessors = [];

			// refs #47
			if (node.importKind && node.importKind === 'type') {
				return [];
			}

			let importInformation = {
				variableDeclarations: [],
				accessors: []
			};

			node.specifiers.forEach(function (specifier) {
				var importedSpecifierName = (specifier.imported && specifier.imported.name) || null;
				var localVariable = specifier.local;
				var localVariableName = localVariable.name;

				var actualImport = scope.generateUidIdentifier(localVariableName + "Temp$Import");
				var isLifeBindingActive = scope.generateUidIdentifier(localVariableName + "$IsLifeBindingActive");

				scope.bindings[localVariableName].constant = false;
				scope.bindings[localVariableName].kind = 'let';

				this.lifeBindings[localVariableName] = true;
				//scope.rename(localVariableName, actualImport.name);

				if (importedSpecifierName === localVariableName) {
					specifier.imported = t.identifier(importedSpecifierName);
				}
				specifier.local = actualImport;

				var importVariableDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(isLifeBindingActive), t.booleanLiteral(true))]);
				importVariableDeclaration.lifeBinding = true;

				variableDeclarations.push(importVariableDeclaration);
				variableDeclarations.push(t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier(localVariableName)), actualImport)]));

				accessors.push.apply(accessors, accessorsFor(localVariableName, actualImport, isLifeBindingActive));
			});

			path.replaceWithMultiple(
				t.importDeclaration(),
				variableDeclarations.concat(accessors)
			);

			return [node].concat(variableDeclarations).concat(accessors);
		},*/

		FunctionDeclaration: function(path) {
			var declaration = path.node;
			var originalFunctionIdentifier = declaration.id;

			function getReplacementFunction(replacedFunctionDeclarationIdentifier) {
				return noRewire(t.functionDeclaration(replacedFunctionDeclarationIdentifier, declaration.params, declaration.body, declaration.generator, declaration.async));
			}

			if(!wasProcessed(path)) {
				if (path.parentPath.type === 'Program') {
					path.replaceWith(getReplacementFunction(this.addFunctionReplacementVariable(originalFunctionIdentifier)));
				} else if (path.parentPath.type === 'ExportNamedDeclaration') {
					var replacedFunctionDeclarationIdentifier = this.addFunctionReplacementVariable(originalFunctionIdentifier);
					this.parentPath.insertBefore(getReplacementFunction(replacedFunctionDeclarationIdentifier));
					this.parentPath.replaceWith(t.exportNamedDeclaration(null, [t.exportSpecifier(replacedFunctionDeclarationIdentifier, originalFunctionIdentifier)]));
				}
			}
		}
	};

	function generateExports(rewireInformation) {
		var exports;
		if (rewireInformation.isES6Module && (!rewireInformation.hasCommonJSExport || rewireInformation.hasES6Export)) {
			exports = [
				t.exportNamedDeclaration(null, [
					t.exportSpecifier(this.getUniversalGetterID(), t.identifier('__GetDependency__')),
					t.exportSpecifier(this.getUniversalGetterID(), t.identifier('__get__')),
					t.exportSpecifier(this.getUniversalSetterID(), t.identifier('__Rewire__')),
					t.exportSpecifier(this.getUniversalSetterID(), t.identifier('__set__')),
					t.exportSpecifier(this.getUniversalResetterID(), t.identifier('__ResetDependency__')),
					t.exportSpecifier(this.getAPIObjectID(), t.identifier('__RewireAPI__'))
				])
			];

			if(!hasES6DefaultExport) {
				exports.push(t.exportDefaultDeclaration(this.getAPIObjectID()));
			}
		}
		else if(!rewireInformation.isES6Module || (!rewireInformation.hasES6Export && rewireInformation.hasCommonJSExport)) {
			var moduleExports = t.memberExpression(t.identifier('module'), t.identifier('exports'), false);

			nonEnumerableExports = [
				addNonEnumerableProperty(t, moduleExports, '__Rewire__', rewireInformation.getUniversalSetterID()),
				addNonEnumerableProperty(t, moduleExports, '__set__', rewireInformation.getUniversalSetterID()),
				addNonEnumerableProperty(t, moduleExports, '__ResetDependency__', rewireInformation.getUniversalResetterID()),
				addNonEnumerableProperty(t, moduleExports, '__GetDependency__', rewireInformation.getUniversalGetterID()),
				addNonEnumerableProperty(t, moduleExports, '__get__', rewireInformation.getUniversalGetterID()),
				addNonEnumerableProperty(t, moduleExports, '__RewireAPI__', rewireInformation.getAPIObjectID())
			];

			exports = [ t.ifStatement(
				t.logicalExpression('||',
					t.binaryExpression('===', t.unaryExpression('typeof', moduleExports, true), t.stringLiteral('object')),
					t.binaryExpression('===', t.unaryExpression('typeof', moduleExports, true), t.stringLiteral('function'))
				),
				t.blockStatement(nonEnumerableExports)
			)];
		}
		return exports;
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
							hasCommonJSExport: false,
							lifeBindings: {},
							functionReplacementVariables: [],
							universalAccessors: {
								__GetDependency__: scope.generateUidIdentifier("__GetDependency__"),
								__Rewire__: scope.generateUidIdentifier("__Rewire__"),
								__ResetDependency__: scope.generateUidIdentifier("__ResetDependency__"),
								__RewireAPI__: scope.generateUidIdentifier("__RewireAPI__")
							},

							addFunctionReplacementVariable: function (originalFunctionIdentifier) {
								var replacedFunctionDeclarationIdentifier = noRewire(scope.generateUidIdentifier(originalFunctionIdentifier.name + 'Orig'));
								this.functionReplacementVariables.push(t.variableDeclaration('var', [t.variableDeclarator(originalFunctionIdentifier, replacedFunctionDeclarationIdentifier)]));
								return replacedFunctionDeclarationIdentifier;
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

							getAPIObjectID: function () {
								return this.universalAccessors['__RewireAPI__'];
							}
						};

						var node = path.node;
						var parent = path.parent;
						var scope = path.scope;

						var gettersArrayDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier("__$Getters__")), t.arrayExpression([]))]);
						var settersArrayDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier("__$Setters__")), t.arrayExpression([]))]);
						var resettersArrayDeclaration = t.variableDeclaration('let', [t.variableDeclarator(noRewire(t.identifier("__$Resetters__")), t.arrayExpression([]))]);

						var universalGetter = t.functionDeclaration(
							noRewire(rewireInformation.getUniversalGetterID()),
							[t.identifier("name")],
							t.blockStatement([
								t.returnStatement(t.callExpression(t.memberExpression(t.identifier("__$Getters__"), t.identifier("name"), true), []))
							])
						);

						var universalSetter = t.functionDeclaration(
							noRewire(rewireInformation.getUniversalSetterID()),
							[t.identifier("name"), t.identifier("value")],
							t.blockStatement([
								t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("__$Setters__"), t.identifier("name"), true), [t.identifier("value")]))
							])
						);

						var universalResetter = t.functionDeclaration(
							noRewire(rewireInformation.getUniversalResetterID()),
							[t.identifier("name")],
							t.blockStatement([
								t.expressionStatement(t.callExpression(t.memberExpression(t.identifier("__$Resetters__"), t.identifier("name"), true), []))
							])
						);

						var rewireAPIObject = t.variableDeclaration('let', [
							t.variableDeclarator(noRewire(rewireInformation.getAPIObjectID()), t.objectExpression([
								t.objectProperty(t.stringLiteral('__GetDependency__'), universalGetter.id),
								t.objectProperty(t.stringLiteral('__get__'), universalGetter.id),
								t.objectProperty(t.stringLiteral('__Rewire__'), universalSetter.id),
								t.objectProperty(t.stringLiteral('__set__'), universalSetter.id),
								t.objectProperty(t.stringLiteral('__ResetDependency__'), universalResetter.id)
							]))
						]);

						path.traverse(BodyVisitor, rewireInformation);

						path.replaceWith(noRewire(t.Program(rewireInformation.functionReplacementVariables.concat([
							gettersArrayDeclaration,
							settersArrayDeclaration,
							resettersArrayDeclaration,
							universalGetter,
							universalSetter,
							universalResetter,
							rewireAPIObject
						]).concat(node.body).concat(generateExports(rewireInformation)), node.directives)));
					}
				}
			}
	}
};

var remainingVistors = {
	ExpressionStatement: function(path) {
		var node = path.node;
		var parent = path.parent;
		var scope = path.scope;

		if(parent.sourceType === 'module' && !!node.expression && node.expression.type === 'AssignmentExpression') {
			var assignmentExpression = node.expression;

			if(!!assignmentExpression.left.object && assignmentExpression.left.object.name === 'module' && !!assignmentExpression.left.property && assignmentExpression.left.property.name === 'exports') {
				hasCommonJSExport = true;
			}
		}
		return node;

	},

	VariableDeclaration: function (path) {
		var node = path.node;
		var parent = path.parent;
		var scope = path.scope;

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
	FunctionDeclaration: function(path) {
		var declaration = path.node;
		var parent = path.parent;
		var scope = path.scope;

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
			path.parentPath.replaceWith(exportSpecifier);
			path.parentPath.insertBefore(newFuntionDeclaration);
		} else {
			return newFuntionDeclaration;
		}
	},

	Identifier: function(path, file) {
		var node = path.node;
		var parent = path.parent;
		var scope = path.scope;

		var isLiveBindingActive = lifeBindings[node.name] === true;
		if(isLiveBindingActive && !node.__noRewire && !node.noLifeBinding
			&& !(parent.type === 'AssignmentExpression' && parent.left == node)
			&& !(parent.type !== 'VariableDeclarator' && parent.id == node)
			&& !(parent.type === 'MemberExpression' && parent.property === node)
			&& !(parent.type === 'ClassDeclaration' && parent.id === node)
			&& !(parent.type === 'Property' && parent.key === node)
			&& !(parent.type === 'ExportSpecifier' && parent.exported === node)
			&& (scope.hasBinding(node.name) && scope.getBinding(node.name).path.node.type.match(/^Import.*/))) {
			return t.callExpression(noRewire(universalAccessors['__GetDependency__']), [ t.stringLiteral(node.name) ]);
		}
		return node;
	},

	'ExportNamedDeclaration|ExportAllDeclaration': {
		enter: function (path) {
			var node = path.node;

			var hasDefaultExport = node.specifiers.some(function(specifier) {
				return specifier.local.name === 'default';
			});
			if(hasDefaultExport) {
				hasES6DefaultExport = true;
			}
			isES6Module = true;

			return node;
		},
		exit: function(node) {
			return node;
		}
	},

	ExportDefaultDeclaration: function (path) {
		var node = path.node;
		var parent = path.parent;
		var scope = path.scope;

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
			t.objectProperty(t.stringLiteral('value'), t.identifier('__Rewire__'))
		])]));

		var addAdditionalProperties = t.ifStatement(
			t.logicalExpression('&&',
				t.parenthesizedExpression(
					t.logicalExpression('||',
						t.binaryExpression('===', t.unaryExpression('typeof', defaultExportVariableId, true), t.stringLiteral('object')),
						t.binaryExpression('===', t.unaryExpression('typeof', defaultExportVariableId, true), t.stringLiteral('function'))
					)
				),
				t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('isExtensible')), [defaultExportVariableId])
			),
			t.blockStatement([
				addNonEnumerableProperty(t, defaultExportVariableId, '__Rewire__', universalAccessors['__Rewire__']),
				addNonEnumerableProperty(t, defaultExportVariableId, '__set__', universalAccessors['__Rewire__']),
				addNonEnumerableProperty(t, defaultExportVariableId, '__ResetDependency__', universalAccessors['__ResetDependency__']),
				addNonEnumerableProperty(t, defaultExportVariableId, '__GetDependency__', universalAccessors['__GetDependency__']),
				addNonEnumerableProperty(t, defaultExportVariableId, '__get__', universalAccessors['__GetDependency__']),
				addNonEnumerableProperty(t, defaultExportVariableId, '__RewireAPI__', universalAccessors['__RewireAPI__'])
			])
		);

		var defaultExport = t.exportDefaultDeclaration(defaultExportVariableId);

		defaultExport.rewired = true;

		return [defaultExportVariableDeclaration, addAdditionalProperties, defaultExport];
	}
};

function addNonEnumerableProperty(t, objectIdentifier, propertyName, valueIdentifier) {
	return t.expressionStatement(t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('defineProperty')), [ objectIdentifier, t.stringLiteral(propertyName),  t.objectExpression([
		t.objectProperty(t.stringLiteral('value'), valueIdentifier),
		t.objectProperty(t.stringLiteral('enumerable'), t.booleanLiteral(false)),
		t.objectProperty(t.stringLiteral('configurable'), t.booleanLiteral(true))
	])]));
}

function accessorsFor(variableName, originalVar, isLifeBindingActive) {
	var accessor = function(array, variableName, operation) {
		return t.expressionStatement(t.assignmentExpression("=", t.memberExpression(array, t.stringLiteral(variableName), true), operation));
	};

	var noLifeBindingVariableName = noRewire(t.identifier(variableName));
	noLifeBindingVariableName.noLifeBinding = true;

	var getter;
	if(!isLifeBindingActive) {
		getter = noRewire(t.functionDeclaration(
			getter,
			[],
			t.blockStatement([
				t.returnStatement(t.identifier(variableName))
			])
		));
	} else {
		getter = noRewire(t.functionDeclaration(
			getter,
			[],
			t.blockStatement([
				t.returnStatement(t.conditionalExpression(isLifeBindingActive, originalVar, noLifeBindingVariableName))
			])
		));
	}

	var setter;
	if(!isLifeBindingActive) {
		setter = t.functionDeclaration(
			null,
			[t.identifier("value")],
			t.blockStatement([
				t.expressionStatement(t.assignmentExpression("=", t.identifier(variableName), t.identifier("value")))
			])
		);
	} else {
		setter = t.functionDeclaration(
			null,
			[t.identifier("value")],
			t.blockStatement([
				t.expressionStatement(t.assignmentExpression("=", isLifeBindingActive, t.booleanLiteral(false))),
				t.expressionStatement(t.assignmentExpression("=", noLifeBindingVariableName, t.identifier("value")))
			])
		);
	}

	var resetter;
	if(!isLifeBindingActive) {
		resetter = t.functionDeclaration(
			null,
			[],
			t.blockStatement([
				t.expressionStatement(t.assignmentExpression("=", t.identifier(variableName), originalVar))
			])
		);
	} else {
		resetter = t.functionDeclaration(
			null,
			[],
			t.blockStatement([
				t.expressionStatement(t.assignmentExpression("=", isLifeBindingActive, t.booleanLiteral(true))),
				t.expressionStatement(t.assignmentExpression("=", noLifeBindingVariableName, originalVar))
			])
		);
	}

	return [
		accessor(t.identifier("__$Getters__"), variableName, getter),
		accessor(t.identifier("__$Setters__"), variableName, setter),
		accessor(t.identifier("__$Resetters__"), variableName, resetter)
	];
}

function wasProcessed(path) {
	return path.node.__noRewire === true;
}

function noRewire(identifier) {
	identifier.__noRewire = true;
	return identifier;
}
