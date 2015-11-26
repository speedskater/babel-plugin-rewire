import { getterTemplate, universalAccesorsTemplate, enrichExportTemplate } from './Templates.js';
import { wasProcessed, noRewire } from './RewireHelpers.js';
import * as t from "babel-types";

export default class RewireState {
	
	constructor(scope) {
		this.isES6Module = false;
		this.hasES6Export = false;
		this.hasES6DefaultExport = false;
		this.nodesToAppendToProgramBody = [];
		this.hasCommonJSExport = false;
		this.accessors = {};
		this.rewiredDataIdentifier = scope.generateUidIdentifier("__RewiredData__");

		this.universalAccessors = {
			__GetDependency__: scope.generateUidIdentifier("__GetDependency__"),
			__Rewire__: scope.generateUidIdentifier("__Rewire__"),
			__ResetDependency__: scope.generateUidIdentifier("__ResetDependency__"),
			__RewireAPI__: scope.generateUidIdentifier("__RewireAPI__"),
			__with__: scope.generateUidIdentifier("__with__")
		};
	}

	appendToProgramBody(nodes) {
		if(!Array.isArray(nodes)) {
			nodes = [ nodes ];
		}
		this.nodesToAppendToProgramBody = this.nodesToAppendToProgramBody.concat(nodes);
	}

	ensureAccessor(path, variableName) {
		if(!this.accessors[variableName]) {
			this.accessors[variableName] = noRewire(path.scope.generateUidIdentifier('get_' + variableName));
			this.appendToProgramBody(getterTemplate({
				GETTER_NAME: this.accessors[variableName],
				VARIABLENAME: t.stringLiteral(variableName),
				VARIABLE: t.identifier(variableName),
				REWIRED_DATA_IDENTIFIER: this.rewiredDataIdentifier
			}));
		}

		return this.accessors[variableName];
	}

	appendUniversalAccessors(scope) {
		this.appendToProgramBody(universalAccesorsTemplate({
			GETTERS_IDENTIFIER: noRewire(scope.generateUidIdentifier('__GETTERS__')),
			ALL_GETTERS: t.objectExpression(Object.keys(this.accessors).map((variableName) => {
				return t.objectProperty(t.stringLiteral(variableName), this.accessors[variableName], false);
			})),
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
		return Object.keys(this.accessors).length > 0;
	}

	getUniversalGetterID() {
		return this.universalAccessors['__GetDependency__'];
	}

	getUniversalSetterID() {
		return this.universalAccessors['__Rewire__'];
	}

	getUniversalResetterID() {
		return this.universalAccessors['__ResetDependency__'];
	}

	getUniversalWithID() {
		return this.universalAccessors['__with__'];
	}

	getAPIObjectID() {
		return this.universalAccessors['__RewireAPI__'];
	}
};