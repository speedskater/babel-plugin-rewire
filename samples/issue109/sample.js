let lastAction;
let lastPayload;

const MockQueueItem = function MockQueueItem(action, payload) {
	lastAction = action;
	lastPayload = payload;
	return { action, payload };
};

import PushQueue from './src/PushQueue';
import expect from "expect.js";

describe('PushQueue', function () {
	beforeEach(function () {
		PushQueue.__Rewire__('PushQueueItem', MockQueueItem);
		this.queue = new PushQueue();
	});

	afterEach(function () {
		PushQueue.__ResetDependency__('PushQueueItem');
	});

	it('should run and be able to rewire dependencies', function() {
		PushQueue.createItem("action1", "payload2");
		expect(lastAction).to.be("action1");
		expect(lastPayload).to.be("payload2");
	});
});
