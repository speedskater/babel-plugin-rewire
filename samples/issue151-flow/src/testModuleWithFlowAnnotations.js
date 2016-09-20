/* @flow */

export type Separators = {
	decimalSeparator?: string,
	thousandsSeparator?: string,
}

export type L10N = {
	separators: Separators
}

const defaultSeparators: Separators = {
	decimalSeparator: '',
	thousandsSeparator: ''
};

let separators: Separators = { ...defaultSeparators };

const l10n: L10N = {
	get separators(): Separators {
		return { ...separators };
	},
	set separators(data: Separators): void {
		separators = {
			...defaultSeparators,
			...separators,
			...data
		};
	}
};

export default l10n;