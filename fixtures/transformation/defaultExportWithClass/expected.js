'use strict';

import _fetchTemp from 'isomorphic-fetch';

let __$Getters__ = [];
let __$Setters__ = [];
let __$Resetters__ = [];

function __GetDependency__(name) {
    return __$Getters__[name]();
}

function __Rewire__(name, value) {
    __$Setters__[name](value);
}

function __ResetDependency__(name) {
    __$Resetters__[name]();
}

let fetch = _fetchTemp;

__$Getters__['fetch'] = function () {
    return fetch;
};

__$Setters__['fetch'] = function (value) {
    fetch = value;
};

__$Resetters__['fetch'] = function () {
    fetch = _fetchTemp;
};

class EclipseClient {
    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            this.apiUrl = 'http:///';
        } else {
            this.apiUrl = 'http:///';
        }
    }

}
export default Object.assign(EclipseClient, {
    '__Rewire__': __Rewire__,
    '__set__': __Rewire__,
    '__ResetDependency__': __ResetDependency__,
    '__GetDependency__': __GetDependency__,
    '__get__': __GetDependency__
});
export { __GetDependency__ };
export { __GetDependency__ as __get__ };
export { __Rewire__ };
export { __Rewire__ as __set__ };
export { __ResetDependency__ };