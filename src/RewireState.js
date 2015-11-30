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

import { universalAccesorsTemplate, enrichExportTemplate } from './Templates.js';
import { wasProcessed, noRewire } from './RewireHelpers.js';
import * as t from 'babel-types';

export default class RewireState {
	
	constructor(scope) {
		this.isES6Module = false;
		this.hasES6Export = false;
		this.hasES6DefaultExport = false;
		this.nodesToAppendToProgramBody = [];
		this.hasCommonJSExport = false;
		this.accessors = {};
		this.updateableVariables = {};
		this.rewiredDataIdentifier = scope.generateUidIdentifier('__RewiredData__');
		this.originalVariableAccessorIdentifier = scope.generateUidIdentifier('__get_original__');
		this.originalVariableSetterIdentifier = scope.generateUidIdentifier('__set_original__');
		this.updateOperationIdentifier = scope.generateUidIdentifier('__update_operation__');
		this.assignmentOperationIdentifier = scope.generateUidIdentifier('__assign__');

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

	ensureAccessor(variableName) {
		if(!this.accessors[variableName]) {
			this.accessors[variableName] = true;
		}

		return this.accessors[variableName];
	}

	addUpdateableVariable(variableName) {
		this.updateableVariables[variableName] = true;
		this.ensureAccessor(variableName);
	}

	appendUniversalAccessors(scope) {
		let originalAccessor = t.functionDeclaration(this.originalVariableAccessorIdentifier, [ t.identifier('variableName') ], t.blockStatement([
			t.switchStatement(t.identifier('variableName'), Object.keys(this.accessors).map(function(identifierName) {
				return t.switchCase(t.stringLiteral(identifierName), [ t.returnStatement(noRewire(t.identifier(identifierName))) ] );
			})),
			t.returnStatement(noRewire(t.identifier('undefined')))
		]));

		let valueVariable = scope.generateUidIdentifier('value');
		let originalSetter = t.functionDeclaration(this.originalVariableSetterIdentifier,  [ t.identifier('variableName'), valueVariable ], t.blockStatement([
			t.switchStatement(t.identifier('variableName'), Object.keys(this.updateableVariables).map(function(identifierName) {
				return t.switchCase(t.stringLiteral(identifierName), [ t.returnStatement(t.assignmentExpression('=', noRewire(t.identifier(identifierName)), valueVariable)) ] );
			})),
			t.returnStatement(noRewire(t.identifier('undefined')))
		]));

		this.appendToProgramBody(universalAccesorsTemplate({
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
			REWIRED_DATA_IDENTIFIER: this.rewiredDataIdentifier
		}));
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
};