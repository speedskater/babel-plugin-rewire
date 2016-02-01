var babel = require('babel-core');

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

export default function ({ source }, api) {
	let babelRewireApiCallLocations = [];

	let imports={}; //move to state
	let rewireApiCalls= {

	};

	return babel.transform(source, { compact: false, "plugins": [
		function ({types: t}) {
			return {
				visitor: {
					MemberExpression(path) {
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
								//console.log('ImportDeclaration: ' + variableBinding.path.node.imported.name);
								let importDeclaration = variableBinding.path.parent;
								let importLine = importDeclaration.loc.start.line;

								if(!imports[objectId.name]) {
									let moduleIdentifierName = objectId.name + 'Module';
									if(scope.getBinding(moduleIdentifierName)) {
										moduleIdentifierName = scope.generateUidIdentifier(moduleIdentifierName).name
									}
									imports[objectId.name] = moduleIdentifierName;

									variableBinding.path.parentPath.insertBefore([
										t.importDeclaration([t.importSpecifier(t.identifier(moduleIdentifierName), t.identifier('__ModuleAPI__'))], importDeclaration.source)
									]);

									console.log('Insert After parent path: ' + moduleIdentifierName)
								}

								path.replaceWith(t.memberExpression(t.identifier(imports[objectId.name]), t.identifier(MapRewireApiCalls[node.property.name]), node.computed));

							} else if(variableBinding !== undefined && variableBinding.path.node.type === 'VariableDeclarator' &&
								variableBinding.path.node.init.type === 'CallExpression' &&
								variableBinding.path.node.init.callee.name === 'require') {

								variableBinding.path.node.replaceWith()

								if(!rewireApiCalls[memberExpressionLine]) {
									rewireApiCalls[memberExpressionLine] = [];
								}
								rewireApiCalls[memberExpressionLine].push({
									column: node.loc.start.column,
									type: 'commonjs'
								});
							}
							//console.dir(node.loc);
						}
						//path.node.name = path.node.name.split('').reverse().join('');
					}
				},

				CallExpression(path) {
					let {node, parent, scope} = path;

					if(node.callee.type === 'Identifier' && isApiProperty(node.callee)) {
						let variableBinding = scope.getBinding(objectId.name);

						if(variableBinding !== undefined && variableBinding.path.parent.type === 'ImportDeclaration'
							&& ((variableBinding.path.node.imported || variableBinding.path.node.local || {}).name) !== node.callee.name
						) {

						//console.log('ImportDeclaration: ' + variableBinding.path.node.imported.name);
						let importDeclaration = variableBinding.path.parent;
						let importLine = importDeclaration.loc.start.line;

						if(!imports[objectId.name]) {
							let moduleIdentifierName = objectId.name + 'Module';
							if(scope.getBinding(moduleIdentifierName)) {
								moduleIdentifierName = scope.generateUidIdentifier(moduleIdentifierName).name
							}
							imports[objectId.name] = moduleIdentifierName;

							variableBinding.path.parentPath.insertBefore([
								t.importDeclaration([t.importSpecifier(t.identifier(moduleIdentifierName), t.identifier('__ModuleAPI__'))], importDeclaration.source)
							]);

							console.log('Insert After parent path: ' + moduleIdentifierName)
						}

						path.replaceWith(t.memberExpression(t.identifier(imports[objectId.name]), t.identifier(MapRewireApiCalls[node.property.name]), node.computed));

					}
				}
			};
		}]
	}).code;


}
