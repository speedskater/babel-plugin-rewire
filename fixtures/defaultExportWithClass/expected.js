'use strict';

export { __GetDependency__ };
export { __Rewire__ };
export { __ResetDependency__ };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

import _fetchTemp from 'isomorphic-fetch';

var __$Getters__ = [];
var __$Setters__ = [];
var __$Resetters__ = [];

function __GetDependency__(name) {
    return __$Getters__[name]();
}

function __Rewire__(name, value) {
    __$Setters__[name](value);
}

function __ResetDependency__(name) {
    __$Resetters__[name]();
}

var fetch = _fetchTemp;

function __setfetch__(value) {
    fetch = value;
}

function __getfetch__() {
    return fetch;
}

function __resetfetch__() {
    fetch = _fetchTemp;
}

__$Getters__['fetch'] = __getfetch__;
__$Setters__['fetch'] = __setfetch__;
__$Resetters__['fetch'] = __resetfetch__;

var EclipseClient = function EclipseClient() {
    _classCallCheck(this, EclipseClient);

    if (process.env.NODE_ENV !== 'production') {
        this.apiUrl = 'http:///';
    } else {
        this.apiUrl = 'http:///';
    }
};

export default Object.assign(EclipseClient, {
    '__Rewire__': __Rewire__,
    '__set__': __Rewire__,
    '__ResetDependency__': __ResetDependency__,
    '__GetDependency__': __GetDependency__,
    '__get__': __GetDependency__
});