// @flow
import PushQueueItem from './PushQueueItem';

export default class PushQueue {
	constructor() {
		this._queue = new Map();
	}

  static createItem(action, payload) {
    return new PushQueueItem(action, payload);
  }

  getAllQueues(): Map {
    return this._queue;
  }

  getQueue(runtimeId: string): PushQueueItem[] {
    const queue = this._queue.get(runtimeId);
    if (queue) {
      return queue;
    }

    // When queue is not there, create a new queue
    const newQueue: PushQueueItem[] = [];
    this._queue.set(runtimeId, newQueue);
    return newQueue;
  }

  removeQueue(runtimeId: number) {
    this._queue.delete(runtimeId);
  }
}
