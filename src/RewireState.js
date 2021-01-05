/*Copyright (c) 2015, Robert Binna <r.binna@synedra.com>

 Permission to use, copy, modify, and/or distribute this software for any
 purpose with or without fee is hereby granted, provided that the above
 copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED 'AS IS' AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.*/

import Templates from './Templates.js';
import { wasProcessed, noRewire } from './RewireHelpers.js';
var t;
var universalAccesorsTemplate;
var enrichExportTemplate;
var filterWildcardImportTemplate;

export default class RewireState {

	constructor(scope, types, template) {
		t = types;
		const templates = Templates(template);
		universalAccesorsTemplate = templates.universalAccesorsTemplate;
		enrichExportTemplate = templates.enrichExportTemplate;
		filterWildcardImportTemplate = templates.filterWildcardImportTemplate;
		this.isES6Module = false;
		this.hasES6Export = false;
		this.hasES6DefaultExport = false;
		this.nodesToAppendToProgramBody = [];
		this.hasCommonJSExport = false;
		this.accessors = {};
		this.trackedIdentfiers = {};
		this.isWildcardImport = {};
		this.ignoredIdentifiers = [];
		this.updateableVariables = {};
		this.getGlobalVariableHandleIdentifier = scope.generateUidIdentifier('getGlobalObject');
		this.getRewiredDataIdentifier = scope.generateUidIdentifier('__getRewiredData__');
		this.getRewireRegistryIdentifier = scope.generateUidIdentifier('__getRewireRegistry__');
		this.getUniqueGlobalModuleIdIdentifier = scope.generateUidIdentifier('__getRewireModuleId__');
		this.uniqueModuleIdIdentifier = scope.generateUidIdentifier('__RewireModuleId__');
		this.originalVariableAccessorIdentifier = scope.generateUidIdentifier('__get_original__');
		this.originalVariableSetterIdentifier = scope.generateUidIdentifier('__set_original__');
		this.updateOperationIdentifier = scope.generateUidIdentifier('__update_operation__');
		this.assignmentOperationIdentifier = scope.generateUidIdentifier('__assign__');
		this.typeofOriginalExportVariable = scope.generateUidIdentifier('typeOfOriginalExport');

		this.universalAccessors = {
			__get__: noRewire(scope.generateUidIdentifier('__get__')),
			__set__: noRewire(scope.generateUidIdentifier('__set__')),
			__reset__: noRewire(scope.generateUidIdentifier('__reset__')),
			__with__: noRewire(scope.generateUidIdentifier('__with__')),
			__RewireAPI__: noRewire(scope.generateUidIdentifier('__RewireAPI__')),
			__assignOperation: noRewire(scope.generateUidIdentifier('__assign__')),
		};
	}

	appendToProgramBody(nodes) {
		if(!Array.isArray(nodes)) {
			nodes = [ nodes ];
		}
		this.nodesToAppendToProgramBody = this.nodesToAppendToProgramBody.concat(nodes);
	}

	prependToProgramBody(nodes) {
		if(!Array.isArray(nodes)) {
			nodes = [ nodes ];
		}
		this.nodesToAppendToProgramBody = nodes.concat(this.nodesToAppendToProgramBody);
	}

	ensureAccessor(variableName, isWildcardImport = false) {
		if(!this.accessors.hasOwnProperty(variableName)) {
			this.accessors[variableName] = true;
			this.addTrackedIdentifier(variableName, isWildcardImport);
		}

		return this.accessors[variableName];
	}
	
	addTrackedIdentifier(variableName, isWildcardImport = false) {
		this.isWildcardImport[variableName] = isWildcardImport
		return this.trackedIdentfiers[variableName] = true;
	}

	hasTrackedIdentifier(variableName) {
		return !!this.trackedIdentfiers[variableName];
	}

	addUpdateableVariable(variableName) {
		this.updateableVariables[variableName] = true;
		this.ensureAccessor(variableName);
	}

	setIgnoredIdentifiers(ignoredIdentifiers) {
		this.ignoredIdentifiers = ignoredIdentifiers || [];
	}

	prependUniversalAccessors(scope) {
		let hasWildcardImport = Object.keys(this.isWildcardImport).some(function(propertyName) {
			return this.isWildcardImport[propertyName];
		}.bind(this));
		let filterWildcardImportIdentifier = (hasWildcardImport && noRewire(scope.generateUidIdentifier('__filterWildcardImport__'))) || null;

		let originalAccessor = t.functionDeclaration(this.originalVariableAccessorIdentifier, [ t.identifier('variableName') ], t.blockStatement([
			t.switchStatement(t.identifier('variableName'), Object.keys(this.accessors).map(function(identifierName) {
				let accessOriginalVariable = noRewire(t.identifier(identifierName));

				if(this.isWildcardImport[identifierName]) {
					accessOriginalVariable = t.callExpression(filterWildcardImportIdentifier, [ accessOriginalVariable ]);
				}

				return t.switchCase(t.stringLiteral(identifierName), [ t.returnStatement(accessOriginalVariable) ] );
			}, this)),
			t.returnStatement(noRewire(t.identifier('undefined')))
		]));

		let valueVariable = scope.generateUidIdentifier('value');
		let originalSetter = t.functionDeclaration(this.originalVariableSetterIdentifier,  [ t.identifier('variableName'), valueVariable ], t.blockStatement([
			t.switchStatement(t.identifier('variableName'), Object.keys(this.updateableVariables).map(function(identifierName) {
				return t.switchCase(t.stringLiteral(identifierName), [ t.returnStatement(t.assignmentExpression('=', noRewire(t.identifier(identifierName)), valueVariable)) ] );
			})),
			t.returnStatement(noRewire(t.identifier('undefined')))
		]));

		this.prependToProgramBody(universalAccesorsTemplate({
			ORIGINAL_VARIABLE_ACCESSOR_IDENTIFIER: this.originalVariableAccessorIdentifier,
			ORIGINAL_VARIABLE_SETTER_IDENTIFIER: this.originalVariableSetterIdentifier,
			ASSIGNMENT_OPERATION_IDENTIFIER: this.assignmentOperationIdentifier,
			UPDATE_OPERATION_IDENTIFIER: this.updateOperationIdentifier,
			ORIGINAL_ACCESSOR: originalAccessor,
			ORIGINAL_SETTER: originalSetter,
			UNIVERSAL_GETTER_ID :this.getUniversalGetterID(),
			UNIVERSAL_SETTER_ID :this.getUniversalSetterID(),
			UNIVERSAL_RESETTER_ID :this.getUniversalResetterID(),
			UNIVERSAL_WITH_ID :this.getUniversalWithID(),
			API_OBJECT_ID: this.getAPIObjectID(),
			GET_GLOBAL_VARIABLE_HANDLE_IDENTIFIER: this.getGlobalVariableHandleIdentifier,
			GET_REWIRE_DATA_IDENTIFIER: this.getRewiredDataIdentifier,
			GET_UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER : this.getUniqueGlobalModuleIdIdentifier,
			GET_REWIRE_REGISTRY_IDENTIFIER: this.getRewireRegistryIdentifier,
			UNIQUE_GLOBAL_MODULE_ID_IDENTIFIER: this.uniqueModuleIdIdentifier
		}));

		if(hasWildcardImport) {
			this.appendToProgramBody(filterWildcardImportTemplate({
				FILTER_WILDCARD_IMPORT_IDENTIFIER: filterWildcardImportIdentifier
			}));
		}
	}

	appendExports() {
		if (this.isES6Module && (!this.hasCommonJSExport || this.hasES6Export)) {
			this.appendToProgramBody(this.generateNamedExports());

			if(!this.hasES6DefaultExport) {
				this.appendToProgramBody(t.exportDefaultDeclaration(this.getAPIObjectID()));
			}
		}
		else if(!this.isES6Module || (!this.hasES6Export && this.hasCommonJSExport)) {
			let commonJSExport = t.memberExpression(t.identifier('module'), t.identifier('exports'), false);
			this.enrichExport(commonJSExport);
		}
	}

	enrichExport(exportValue) {
		this.appendToProgramBody(enrichExportTemplate({
			TYPEOFORIGINALEXPORTVARIABLE: this.getTypeOfOriginalExportVariable(),
			UNIVERSAL_GETTER_ID: this.getUniversalGetterID(),
			UNIVERSAL_SETTER_ID: this.getUniversalSetterID(),
			UNIVERSAL_RESETTER_ID: this.getUniversalResetterID(),
			UNIVERSAL_WITH_ID: this.getUniversalWithID(),
			API_OBJECT_ID: this.getAPIObjectID(),
			EXPORT_VALUE: exportValue
		}));
	}

	generateNamedExports() {
		return t.exportNamedDeclaration(null, [
			t.exportSpecifier(this.getUniversalGetterID(), t.identifier('__get__')),
			t.exportSpecifier(this.getUniversalGetterID(), t.identifier('__GetDependency__')),
			t.exportSpecifier(this.getUniversalSetterID(), t.identifier('__Rewire__')),
			t.exportSpecifier(this.getUniversalSetterID(), t.identifier('__set__')),
			t.exportSpecifier(this.getUniversalResetterID(), t.identifier('__ResetDependency__')),
			t.exportSpecifier(this.getAPIObjectID(), t.identifier('__RewireAPI__'))
		]);
	}

	containsDependenciesToRewire() {
		return Object.keys(this.accessors).length > 0 || Object.keys(this.updateableVariables).length > 0;
	}

	getUniversalGetterID() {
		return this.universalAccessors['__get__'];
	}

	getUpdateOperationID() {
		return this.updateOperationIdentifier;
	}

	getAssignmentOperationID() {
		return this.assignmentOperationIdentifier;
	}

	getUniversalSetterID() {
		return this.universalAccessors['__set__'];
	}

	getUniversalResetterID() {
		return this.universalAccessors['__reset__'];
	}

	getUniversalWithID() {
		return this.universalAccessors['__with__'];
	}

	getAPIObjectID() {
		return this.universalAccessors['__RewireAPI__'];
	}

	getTypeOfOriginalExportVariable() {
		return this.typeofOriginalExportVariable;
	}
};
