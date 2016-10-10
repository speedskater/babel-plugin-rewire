// Test
import {expect} from 'chai'
import module from './src/module.js'

describe('issue165', () => {
	it('should return the answer to life', async () => {
		let result = await module('hello')
		expect(result).to.equal('42!')
	})

	it('should return the answer to life', async () => {
		let result = await module('test', '?')
		expect(result).to.equal('42?')
	})
});