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
var GettersArray = t.identifier("__$Getters__");
var SettersArray = t.identifier("__$Setters__");
var ReSettersArray = t.identifier("__$Resetters__");


module.exports = new Transformer("rewire", {
	Program: function(node) {
		var gettersArrayDeclaration = t.variableDeclaration('let', [ t.variableDeclarator(GettersArray, t.arrayExpression([])) ]);
		var settersArrayDeclaration = t.variableDeclaration('let', [ t.variableDeclarator(SettersArray, t.arrayExpression([])) ]);
		var resettersArrayDeclaration = t.variableDeclaration('let', [ t.variableDeclarator(ReSettersArray, t.arrayExpression([])) ]);

		var nameVariable = t.identifier("name");
		var valueVariable = t.identifier("value");

		var universalGetter = t.exportNamedDeclaration(t.functionDeclaration(
			t.identifier('__GetDependency__'),
			[nameVariable ],
			t.blockStatement([
				t.returnStatement(t.callExpression(t.memberExpression(GettersArray, nameVariable, true), []))
			])
		));

		var universalSetter = t.exportNamedDeclaration(t.functionDeclaration(
			t.identifier('__Rewire__'),
			[nameVariable, valueVariable ],
			t.blockStatement([
				t.expressionStatement(t.callExpression(t.memberExpression(SettersArray, nameVariable, true), [valueVariable]))
			])
		));

		var universalResetter = t.exportNamedDeclaration(t.functionDeclaration(
			t.identifier('__ResetDependency__'),
			[ nameVariable ],
			t.blockStatement([
				t.expressionStatement(t.callExpression(t.memberExpression(ReSettersArray, nameVariable, true), []))
			])
		));

		node.body.unshift(gettersArrayDeclaration, settersArrayDeclaration, resettersArrayDeclaration, universalGetter,
			universalSetter, universalResetter);
		return node;
	},
	ImportDeclaration: function(node, parent, scope, file) {
		var variableDeclarations = [];
		var getters = [];
		var setters = [];
		var resetters = [];
		var accessors = [];

		node.specifiers.forEach(function(specifier) {
			var localVariable = specifier.local;
			var localVariableName = localVariable.name;
			var getter = t.identifier('__get' + localVariableName + '__');
			var setter = t.identifier('__set' + localVariableName + '__');
			var resetter = t.identifier('__reset' + localVariableName + '__');
			var requireExpression = t.callExpression(t.identifier('require'), [node.source]) ;
			var actualImport = scope.generateUidIdentifier(localVariableName + "Temp");
			specifier.local = actualImport;

			variableDeclarations.push(t.variableDeclaration('let', [ t.variableDeclarator(localVariable, actualImport)]));

			function addAccessor(array, operation) {
				accessors.push(t.expressionStatement(t.assignmentExpression("=", t.memberExpression(array, t.literal(localVariableName), true), operation)));
			}

			getters.push(t.functionDeclaration(
				getter,
				[],
				t.blockStatement([
					t.returnStatement(localVariable)
				])
			));
			addAccessor(GettersArray, getter);

			setters.push(t.functionDeclaration(
				setter,
				[t.identifier("value")],
				t.blockStatement([
					t.expressionStatement(t.assignmentExpression("=", localVariable, t.identifier("value")))
				])
			));
			addAccessor(SettersArray, setter);


			resetters.push(t.functionDeclaration(
				resetter,
				[],
				t.blockStatement([
					t.expressionStatement(t.assignmentExpression("=", localVariable, actualImport))
				])
			));
			addAccessor(ReSettersArray, resetter);

		});

		return [node].concat(variableDeclarations).concat(setters).concat(getters).concat(resetters).concat(accessors);
	},

	ExportDefaultDeclaration: function(node) {
		return t.exportDefaultDeclaration(t.callExpression(t.memberExpression(t.identifier('Object'),  t.identifier('assign')), [ node.declaration, t.objectExpression([
			t.property('init', t.literal('__Rewire__'), t.identifier('__Rewire__')),
			t.property('init',t.literal('__ResetDependency__'), t.identifier('__ResetDependency__')),
			t.property('init',t.literal('__GetDependency__'), t.identifier('__GetDependency__'))
		])]));
	}
});