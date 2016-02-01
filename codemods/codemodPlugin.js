import path from 'path';

const MapRewireApiCalls = {
	__Rewire__: '__set__',
	__set__: '__set__',
	__GetDependency__: '__get__',
	__get__: '__get__',
	__ResetDependency__: '__reset__',
	__with__: '__with__',
	__reset__: '__reset__',
	__RewireAPI__: '__ModuleAPI__'
};

function isApiProperty(identifier) {
	return Object.keys(MapRewireApiCalls).some(apiProperty => apiProperty === identifier.name)
}

function ensureEs6ModuleApiImport(t, modules, scope, importDeclarationPath, moduleName = null) {
	let importDeclaration = importDeclarationPath.node;
	if(!modules[importDeclaration.source.value]) {
		let moduleIdentifierName = (moduleName || path.basename(importDeclaration.source.value, path.extname(importDeclaration.source.value))) + 'Module';

		if(scope.getBinding(moduleIdentifierName)) {
			moduleIdentifierName = scope.generateUidIdentifier(moduleIdentifierName).name
		}
		modules[importDeclaration.source.value] = moduleIdentifierName;

		importDeclarationPath.insertBefore([
			t.importDeclaration([t.importSpecifier(t.identifier(moduleIdentifierName), t.identifier('__ModuleAPI__'))], importDeclaration.source)
		]);
	}
}

module.exports = function({ types: t }) {
	const ChangeAPIVisitor = {
		MemberExpression(path, modules) {
			let {node, parent, scope} = path;

			if(node.property.type === 'Identifier' && node.object.type === 'Identifier' && isApiProperty(node.property)) {
				let objectId = node.object;

				//is common js => calls prefixen mit __RewireAPI__ + unified API call __Rewire__ => __set__ etc.
				//in case of es 6 determine import path of rewired module. Add new named import in line below
				//replace rewire call with Module and unify method names

				//todo furthermore handle explicit API calls

				let variableBinding = scope.getBinding(objectId.name);

				if(variableBinding !== undefined && variableBinding.path.parent.type === 'ImportDeclaration'
					&& ((variableBinding.path.node.imported || variableBinding.path.node.local || {}).name) !== '__ModuleAPI__'
				) {
					let importDeclarationPath = variableBinding.path.parentPath;
					ensureEs6ModuleApiImport(t, modules, scope, importDeclarationPath, objectId.name);
					//console.log('ImportDeclaration: ' + variableBinding.path.node.imported.name);
					path.replaceWith(t.memberExpression(t.identifier(modules[importDeclarationPath.node.source.value]), t.identifier(MapRewireApiCalls[node.property.name]), node.computed));

				} else if(variableBinding !== undefined && variableBinding.path.node.type === 'VariableDeclarator' &&
					variableBinding.path.node.init.type === 'CallExpression' &&
					variableBinding.path.node.init.callee.name === 'require') {
					console.log('require dings ');
					let argument = variableBinding.path.node.init.arguments[0];

					let importName = argument.value || argument.name || argument.toString();

					path.replaceWith(t.memberExpression(t.memberExpression(node.object, t.identifier('__ModuleAPI__')), t.identifier(MapRewireApiCalls[node.property.name])));
				}
				//console.dir(node.loc);
			}
			//path.node.name = path.node.name.split('').reverse().join('');
		},

		CallExpression(path, modules = {}) {
			let {node, parent, scope} = path;

			if(node.callee.type === 'Identifier' && isApiProperty(node.callee)) {
				let variableBinding = scope.getBinding(node.callee.name);
				if(variableBinding !== undefined && variableBinding.path.parent.type === 'ImportDeclaration'
					&& ((variableBinding.path.node.imported || variableBinding.path.node.local || {}).name) === node.callee.name
				) {
					let importDeclarationPath = variableBinding.path.parentPath;
					ensureEs6ModuleApiImport(t, modules, scope, importDeclarationPath);
					path.replaceWith(t.callExpression(t.memberExpression(t.identifier(modules[importDeclarationPath.node.source.value]), t.identifier(MapRewireApiCalls[node.callee.name]), node.computed), node.arguments));
					if(importDeclarationPath.node.specifiers.length == 1)  {
						importDeclarationPath.remove();
					} else {
						variableBinding.path.remove();
					}
				}
			}
		}
	}; //TODO handle aliased

	const ProgramVisitor = {
		Program: function(path, file) {
			path.traverse(ChangeAPIVisitor, { modules: {} });
		}
	};

	return {
		visitor: ProgramVisitor
	};
};
