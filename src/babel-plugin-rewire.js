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

import RewireState from './RewireState.js';
import { wasProcessed, noRewire, contains } from './RewireHelpers.js';

module.exports = function({ types: t }) {
	const BodyVisitor = {
		Identifier: function (path, rewireInformation) {
			let { node, parent, scope } = path;
			let variableName = node.name;
			let variableBinding = scope.getBinding(variableName);

			//Matches for body
			if (!wasProcessed(path)
				&& variableName !== 'undefined' && variableName !== 'arguments' && variableName !== 'Object' && variableName !== 'require'
				&& !(parent.type === 'AssignmentExpression' && parent.left == node)
				&& !(parent.type !== 'VariableDeclarator' && parent.id == node)
				&& !(parent.type === 'MemberExpression' && parent.property === node)
				&& !(parent.type === 'ObjectProperty' && parent.key === node)
				&& !(parent.type === 'ObjectProperty' && path.parentPath && path.parentPath.parent && path.parentPath.parent.type === 'ObjectPattern')
				&& !(parent.type === 'ExportSpecifier')
				&& !(parent.type === 'ImportSpecifier')
				&& !(parent.type === 'ObjectTypeProperty')
				&& !(parent.type === 'ClassMethod')
				&& !(parent.type === 'UpdateExpression')
			) {
				if (variableBinding === undefined ||
					(variableBinding.scope.block.type === 'Program' && variableBinding.referencePaths !== null && contains(variableBinding.referencePaths, path))) {
					rewireInformation.ensureAccessor(variableName);
					path.replaceWith(t.callExpression(rewireInformation.getUniversalGetterID(), [ t.stringLiteral(variableName) ]));
				}
			}
		},

		'ExportNamedDeclaration|ExportAllDeclaration': function ({ node: { specifiers } }, rewireInformation) {
			let hasDefaultExport = specifiers.some(function(specifier) {
				return specifier.local.name === 'default';
			});
			rewireInformation.hasES6DefaultExport = rewireInformation.hasES6DefaultExport || hasDefaultExport;
			rewireInformation.isES6Module = true;
		},

		AssignmentExpression: function({ node: assignmentExpression, scope: { block: { type: blockType }} }, rewireInformation) {
			rewireInformation.hasCommonJSExport = blockType === 'Program' &&
			!!assignmentExpression.left.object && assignmentExpression.left.object.name === 'module' &&
			!!assignmentExpression.left.property && assignmentExpression.left.property.name === 'exports';
		},

		ExportDefaultDeclaration: function (path, rewireInformation) {
			if(!wasProcessed(path)) {
				let exportIdentifier = null;
				rewireInformation.hasES6DefaultExport = true;
				rewireInformation.hasES6Export = true;
				rewireInformation.isES6Module = true;

				let declarationVisitors = {
					ClassDeclaration: function(path, rewireInformation) {
						let { node: existingClassDeclaration, parent, scope} = path;
						if(existingClassDeclaration.id === null && parent.type === 'ExportDefaultDeclaration') {
							exportIdentifier = scope.generateUidIdentifier("DefaultExportValue");
							path.replaceWith(
								t.classDeclaration(
									exportIdentifier,
									existingClassDeclaration.superClass,
									existingClassDeclaration.body,
									existingClassDeclaration.decorators || []
								)
							);
						} else {
							exportIdentifier = existingClassDeclaration.id;
						}
					},
					FunctionDeclaration: function(path, rewireInformation) {
						let { node: existingFunctionDeclaration, scope } = path;
						if(existingFunctionDeclaration.id === null && path.parent.type === 'ExportDefaultDeclaration') {
							exportIdentifier = scope.generateUidIdentifier("DefaultExportValue");
							path.replaceWith(
								t.functionDeclaration(
									exportIdentifier,
									existingFunctionDeclaration.params,
									existingFunctionDeclaration.body,
									existingFunctionDeclaration.generator,
									existingFunctionDeclaration.async
								)
							);
						} else {
							exportIdentifier = existingFunctionDeclaration.id;
						}
					},
					Identifier: function({ parent: { type: parentType}, node: identifier }, rewireInformation) {
						if(parentType === 'ExportDefaultDeclaration') {
							exportIdentifier = identifier;
						}
					}
				};

				path.traverse(declarationVisitors, rewireInformation);
				if(exportIdentifier === null) {
					exportIdentifier = noRewire(path.scope.generateUidIdentifier("DefaultExportValue"));
					path.replaceWithMultiple([
						t.variableDeclaration('let', [t.variableDeclarator(exportIdentifier, path.node.declaration)]),
						noRewire(t.exportDefaultDeclaration(exportIdentifier))
					]);
				}
				rewireInformation.enrichExport(exportIdentifier);
			}
		},

		ImportDeclaration: function (path, rewireInformation) {
			rewireInformation.isES6Module = true;
		}
	};

	const ProgramVisitor = {
		Program: function(path, file) {
			if(!wasProcessed(path)) {
				let { scope, node: program } = path;
				let rewireState = new RewireState(scope);

				path.traverse(BodyVisitor, rewireState);

				if(rewireState.containsDependenciesToRewire()) {
					rewireState.appendUniversalAccessors(scope);
					rewireState.appendExports();

					path.replaceWith(noRewire(t.Program(program.body.concat(rewireState.nodesToAppendToProgramBody), program.directives)));
				}
			}
		}
	};

	return {
		visitor: ProgramVisitor
	};
};
