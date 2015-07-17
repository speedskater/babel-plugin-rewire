import { createSingleFieldValidatorFactory } from 'data/commons/ValidatorFactories.js';

export function requiredValidatorFunction( translatedFieldLabel, fieldValue ) {
	return fieldValue === undefined || fieldValue !== null && fieldValue !== '' || translatedFieldLabel + ' is required.';
}

export default createSingleFieldValidatorFactory( requiredValidatorFunction );
